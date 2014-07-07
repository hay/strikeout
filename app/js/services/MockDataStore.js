app.factory('MockDataStore', function(CONF, $q, util, $http) {
    function MockDataStore(jsondata) {
        this.data = jsondata;
    }

    MockDataStore.prototype = {
        _getRecords : function(type, query) {
            query = query || null;

            if (query) {
                return this.data[type].filter(function(record) {
                    var key = Object.keys(query);
                    var val = query[key];
                    return record[key] === val;
                });
            } else {
                return this.data[type];
            }
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
        getDatastore : function() {
            var deferred = $q.defer();

            if (!datastore) {
                datastore = 'loading';

                $http.get('../data/example2.json').then(function(res) {
                    datastore = new MockDataStore(res.data);
                    deferred.resolve(datastore);
                });
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