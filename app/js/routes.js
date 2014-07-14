app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/list/all');

    var commonResolves = {
        datastore : function($injector, CONF) {
            var DataStore = $injector.get(CONF.defaultDataStore);

            return DataStore.getDatastore();
        }
    };

    $stateProvider
        .state('list', {
            url : '/list/:listid',
            views : {
                'lists' : {
                    controller : 'ListsCtrl',
                    templateUrl : 'views/lists.html',
                    resolve : commonResolves
                },
                'items' : {
                    controller : 'ItemsCtrl',
                    templateUrl : 'views/items.html',
                    resolve : commonResolves
                }
            }
        })
        .state('settings', {
            url : '/settings',
            views : {
                'settings' : {
                    controller : 'SettingsCtrl',
                    templateUrl : 'views/settings.html'
                }
            }
        })
});