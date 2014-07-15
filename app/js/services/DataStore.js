app.factory('DataStore', function(CONF, $rootScope, $q, util, DropboxDataStore, $window) {
    function DataStore( datastoreprovider ) {
        this.provider = datastoreprovider;

        $window.addEventListener('beforeunload', function() {
            if (this.provider.getSyncStatus().uploading) {
                return "We're still syncing with the server. Sure you want to close this window?";
            }
        }, false);
    }

    DataStore.prototype = {
        _addRecord : function(type, record) {
            var table = this.provider.getTable(type);
            var newrecord = table.insert(record);

            return _.extend(newrecord.getFields(), { _record : newrecord });
        },

        _getRecords : function(type, query, onlyFields) {
            query = query || null;
            onlyFields = onlyFields || false;
            var table = this.provider.getTable(type);

            return table.query(query).map(function(record) {
                if (onlyFields) {
                    return record.getFields();
                } else {
                    return _.extend(record.getFields(), { _record : record });
                }
            });
        },

        addItem : function(item) {
            return this._addRecord('items', item);
        },

        addList : function(list) {
            return this._addRecord('lists', list);
        },

        getAsJson : function() {
            return JSON.stringify({
                items : this._getRecords('items', null, true),
                lists : this._getRecords('lists', null, true)
            });
        },

        getItems : function(query) {
            return this._getRecords('items', query);
        },

        getLists : function(query) {
            return this._getRecords('lists', query);
        }
    };

    var datastore = false;

    return {
        authenticate : function() {
            return DropboxDataStore.authenticate();
        },

        getDatastore : function() {
            var deferred = $q.defer();

            if (!datastore) {
                datastore = 'loading';

                var provider = new DropboxDataStore();

                provider.getDatastore().then(
                    function(datastoreprovider) {
                        datastore = new DataStore(datastoreprovider);
                        deferred.resolve(datastore);
                    },
                    function(error) {
                        deferred.reject(error);
                    }
                );
            } else if (datastore === 'loading') {
                deferred.notify('loading');

                // Can't imagine this is a good idea...
                var timeout = function() {
                    setTimeout(function() {
                        if (typeof datastore === 'object') {
                            deferred.resolve(datastore);
                        } else {
                            timeout();
                        }
                    }, 200);
                }

                timeout();
            } else if (typeof datastore === 'object') {
                deferred.resolve(datastore);
            }

            return deferred.promise;
        }
    }
});