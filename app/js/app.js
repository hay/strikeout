window.app = angular.module('strikeout', [
    'ui.router'
]);

app.run(function() {
    // Attaching Fastclick removes the 300ms tap delay on touch devices
    FastClick.attach( document.body );
});