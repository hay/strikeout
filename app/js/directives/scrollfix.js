app.directive('scrollfix', function($rootScope, $timeout) {
    return {
        controller : 'MainCtrl',

        link : function(scope, elem) {
            if ($rootScope.listScrollTop) {
                $timeout(function() {
                    elem[0].scrollTop = $rootScope.listScrollTop;
                }, 0);
            }

            function handler(e) {
                $rootScope.listScrollTop = e.target.scrollTop;
            }

            elem[0].addEventListener('scroll', _.debounce(handler, 100), false);
        },

        restrict : 'A'
    };
});