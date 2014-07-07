app.service('util', function($q) {
    return {
        getUuid : function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        },

        scriptPromise : function(src) {
            var deferred = $q.defer();

            var script = document.createElement('script');
            var head = document.querySelector('head');

            script.src = src;

            script.addEventListener('load', function() {
                deferred.resolve();
            }, false);

            head.appendChild(script);

            return deferred.promise;
        }
    };
});