app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/list/all');

    var commonResolves = {
        datastore : function(DataStore) {
            return DataStore.getDatastore();
        }
    };

    var views = {
        'navbar' : {
            controller : 'NavBarCtrl',
            templateUrl : 'js/partials/navbar.html'
        },
        'lists' : {
            controller : 'ListsCtrl',
            templateUrl : 'js/partials/lists.html',
            resolve : commonResolves
        },
        'items' : {
            controller : 'ItemsCtrl',
            templateUrl : 'js/partials/items.html',
            resolve : commonResolves
        },
        'settings' : {
            controller : 'SettingsCtrl',
            templateUrl : 'js/partials/settings.html'
        }
    };

    $stateProvider
        .state('list', {
            url : '/list/:listid',
            views : _.pick(views, 'navbar', 'lists', 'items')
        })
        .state('settings', {
            url : '/settings',
            views : _.pick(views, 'navbar', 'settings')
        })
});