myApp.factory('MarkersJsonService', function($http) {
  var MarkersJsonService= {

      markers: function() {
        var url = '/scripts/services/markers.json';
            var promise = $http.get(url).then(function (response) {
          return response.data;
        });
        return promise;
      }
    };
  return MarkersJsonService;
});
