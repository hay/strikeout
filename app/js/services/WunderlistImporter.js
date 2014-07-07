app.service('WunderlistImporter', function(DataStore) {
    function importJson(data) {
        data.lists.forEach(function(list) {
            DataStore.addList({
                id : list.id,
                position : list.position,
                title : list.title
            });
        });

        data.tasks.forEach(function(task) {
            DataStore.addItem({
                id : task.id,
                list_id : task.list_id,
                position : task.position,
                title : task.title,
                completed : !!task.completed_at
            });
        });
    }

    return {
        importJson : importJson
    };
});