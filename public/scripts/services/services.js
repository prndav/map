myApp.factory('MarkersJsonService', function($http) {
  var MarkersJsonService= {
    /*fromServer: function() {
        var url = 'http://example.com/json.json';
            var promise = $http.jsonp(url).then(function (response) {
          return response.data;
        });
      return promise;
    },*/
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
