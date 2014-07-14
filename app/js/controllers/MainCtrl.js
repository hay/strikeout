app.controller('MainCtrl', function($scope, $state, $rootScope, $injector, $window, CONF) {
    $rootScope.initializing = true;
    $rootScope.loading = true;
    $scope.online = navigator.onLine;
    $scope.touchEnabled = 'ontouchend' in window;

    var DataStore = $injector.get(CONF.defaultDataStore);

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
            record._record.deleteRecord();
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

    $scope.hideLists = function() {
        $scope.listsVisible = false;
    }

    $scope.showLists = function() {
        $scope.listsVisible = true;
    }

    $scope.isDeviceXs = function() {
        var element = document.querySelector('.device-xs');
        return element.offsetWidth > 0 || element.offsetHeight > 0;
    }
});