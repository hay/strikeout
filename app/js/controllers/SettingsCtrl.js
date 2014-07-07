app.controller('SettingsCtrl', function($scope, $rootScope, WunderlistImporter) {
    $scope.importWunderlist = function(json) {
        WunderlistImporter.importJson(json);
    }
});