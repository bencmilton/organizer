app.factory('MoviesListFactory', function ($http) {

    return {

        populateMoviesLists: function (){
            return $http.get('/get-all-lists').then( function(lists){
                return lists.data;
            });

        },

        createList: function (name) {
            return $http.post('/new-movie-list', name).then(function(data){
                //console.log(data)
            })
        },

        removeList: function (listId) {
            console.log('listId: ', listId)
            return $http.delete('/delete-list/' + listId).then(function(data){
                return data;
            })
        }

    };

});