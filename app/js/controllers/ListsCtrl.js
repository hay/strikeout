app.controller('ListsCtrl', function($scope, datastore, $state, $rootScope, $stateParams, util, $window) {
    $scope.currentListId = $stateParams.listid;
    $scope.lists = datastore.getLists();

    $scope.showItems = function(listid) {
        $state.go('list', { listid : listid });
    }

    $scope.addList = function() {
        var list = {
            id : util.getUuid(),
            title : $scope.newList
        };

        $scope.lists.unshift(
            datastore.addList( list )
        );

        $scope.newList = '';
    }

    $scope.deleteList = function(list) {
        if ($scope.deleteRecord(list)) {
            $scope.lists = $scope.lists.filter(function(l) {
                return l.id !== list.id;
            });
        }
    }
});