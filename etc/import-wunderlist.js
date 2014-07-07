var fs = require('fs');
var data = JSON.parse( fs.readFileSync('../data/wexample.json', 'utf-8') );
var d2 = {};

d2.lists = data.lists.map(function(a) {
    return {
        id : a.id,
        position : a.position,
        title : a.title
    };
});

d2.items = data.tasks.map(function(a) {
    return {
        id : a.id,
        list_id : a.list_id,
        position : a.position,
        title : a.title,
        completed : !!a.completed_at
    };
})

console.log(JSON.stringify(d2));