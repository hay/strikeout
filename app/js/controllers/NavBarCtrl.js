app.controller('NavBarCtrl', function($scope, $state, $stateParams, $rootScope) {
    $scope.state = $state.current.name;

    $scope.go = function(state) {
        $state.go(state);
    }
});