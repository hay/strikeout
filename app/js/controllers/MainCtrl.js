app.controller('MainCtrl', function($scope, $state, $rootScope, DataStore) {
    $rootScope.initializing = true;
    $rootScope.loading = true;
    $scope.online = navigator.onLine;

    DataStore.getDatastore().then(
        function() {
            $rootScope.initializing = false;
            $rootScope.loading = false;
            $rootScope.isAuthenticated = true;
        },

        function(error) {
            $rootScope.loading = false;
            $rootScope.isAuthenticated = false;
            $rootScope.error = error;
        }
    );

    $scope.authenticate = function() {
        DataStore.authenticate();
    }

    $scope.deleteRecord = function(record) {
        if ($window.confirm('Delete this item?')) {
            recordToDelete._record.deleteRecord();
            return true;
        } else {
            return false;
        }
    }

    // We update both the representation in the object and the
    // real data in the Datastore object
    $scope.updateRecord = function(record, key, value) {
        record._record.set(key, value);
        record[key] = value;
    }
});