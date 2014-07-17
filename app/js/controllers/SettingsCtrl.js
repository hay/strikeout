app.controller('SettingsCtrl', function($scope, $rootScope, WunderlistImporter, $state) {
    $scope.importWunderlist = function(json) {
        WunderlistImporter.importJson(json);
    }

    $scope.close = function() {
        if ($rootScope.currentListId) {
            $state.go('list', { listid : $rootScope.currentListId });
        } else {
            $state.go('list');
        }
    }
});