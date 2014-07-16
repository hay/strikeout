app.factory('DropboxDataStore', function($q, $window, util, CONF, ERRORS) {

    function DropboxDataStore() {
        this._datastore = false;
        this._client = false;
    }

    DropboxDataStore.prototype = {
        authenticate : function() {
            this._client.authenticate();
        },

        clientPromise : function() {
            var self = this;
            var deferred = $q.defer();

            setTimeout(function() {
                self._client = new $window.Dropbox.Client({ key : CONF.dropboxAppKey });

                self._client.authenticate({ interactive : false }, function(error, client) {
                    if (self._client.isAuthenticated()) {
                        deferred.resolve(self._client);
                    } else {
                        deferred.reject(ERRORS.COULD_NOT_AUTHENTICATE_CLIENT);
                    }
                });
            }, 0);

            return deferred.promise;
        },

        datastorePromise : function() {
            var self = this;
            var deferred = $q.defer();

            if (this._datastore) {
                deferred.resolve(this._datastore);
            } else {
                var manager = this._client.getDatastoreManager();

                manager.openDefaultDatastore(function (error, store) {
                    if (error) {
                        deferred.reject(ERRORS.COULD_NOT_OPEN_DATASTORE);
                    }

                    self._datastore = store;

                    deferred.resolve(self._datastore);
                });
            }

            return deferred.promise;
        },

        getClient : function() {
            return this._client;
        },

        getDatastore : function() {
            var deferred = $q.defer();

            util.scriptPromise(CONF.dropboxApiSrc)
                .then(this.clientPromise)
                .then(this.datastorePromise)
                .then(
                    function(datastore) {
                        deferred.resolve(datastore);
                    },
                    function(error) {
                        deferred.reject(error);
                    }
                );

            return deferred.promise;
        },

        isAuthenticated : function() {
            return this.client.isAuthenticated();
        },

        logout : function() {
            return this._client.signOut();
        }
    };

    DropboxDataStore.authenticate = function() {
        var client = new $window.Dropbox.Client({ key : CONF.dropboxAppKey });
        return client.authenticate();
    }

    return DropboxDataStore;
});