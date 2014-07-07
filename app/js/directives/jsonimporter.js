app.directive('jsonimporter', function() {
    return {
        link : function(scope, elem) {
            var reader = new FileReader();

            reader.onload = function(e) {
                try {
                    var json = JSON.parse(e.target.result);
                } catch(e) {
                    alert('Invalid file');
                    return;
                }

                scope.complete({ json : json });
            }

            elem.on('change', function() {
                if (this.files.length) {
                    var file = this.files[0];
                    reader.readAsText(file);
                }
            });
        },
        restrict : 'E',
        replace : true,
        scope : {
            'complete' : '&onComplete'
        },
        template : '<input type="file" class="form-control" />'
    };
});