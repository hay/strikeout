app.controller('ListsCtrl', function($scope, datastore, $state, $rootScope, $stateParams, util, $window, $timeout) {
    $rootScope.currentListId = $stateParams.listid;
    $scope.lists = datastore.getLists();

    var currentList = datastore.getLists({ id : $scope.currentListId });

    if (currentList.length) {
        $rootScope.currentListName = currentList[0].title;
    }

    $scope.showItems = function(list) {
        $rootScope.currentListId = list.id;

        if ($scope.isDeviceXs()) {
            $scope.hideLists();

            $timeout(function() {
                $state.go('list', { listid : list.id });
            }, 300);
        } else {
            $state.go('list', { listid : list.id });
        }
    }

    $scope.addList = function() {
        var listName = $window.prompt('Enter a list name');

        if (!listName) {
            return;
        }

        var list = {
            id : util.getUuid(),
            title : listName
        };

        $scope.lists.unshift(
            datastore.addList( list )
        );
    }

    $scope.deleteList = function(list) {
        if ($scope.deleteRecord(list)) {
            $scope.lists = $scope.lists.filter(function(l) {
                return l.id !== list.id;
            });
        }
    }
});