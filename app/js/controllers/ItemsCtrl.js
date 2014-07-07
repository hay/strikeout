app.controller('ItemsCtrl', function($scope, $stateParams, $rootScope, datastore, util, $window) {
    $scope.showCompleted = true;
    $scope.listid = $stateParams.listid;

    $scope.allItems = datastore.getItems();

    if ($stateParams.listid === 'all') {
        $scope.items = $scope.allItems;
    } else {
        $scope.items = $scope.allItems.filter(function(item) {
            return item.list_id === $scope.listid;
        });
    }

    $scope.addItem = function() {
        var item = {
            completed : false,
            id : util.getUuid(),
            list_id : $scope.listid,
            title : $scope.newItem
        };

        $scope.items.unshift(
            datastore.addItem( item )
        );

        $scope.newItem = '';
    }

    $scope.deleteItem = function(item) {
        if ($scope.deleteRecord(item)) {
            $scope.items = $scope.items.filter(function(i) {
                return i.id !== item.id;
            });
        }
    }

    $scope.updateItem = function(item, key, value) {
        $scope.updateRecord(item, key, value);
    }
});