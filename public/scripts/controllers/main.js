//Add the requried module 'angular-ui' as a dependency
angular.module('maptesting').directive('helloMaps', function () {
  return function (scope, elem, attrs) {
    var mapOptions,
      latitude = attrs.latitude,
      longitude = attrs.longitude,
      map;

    latitude = latitude && parseFloat(latitude, 10) || 13.0810;
    longitude = longitude && parseFloat(longitude, 10) || 80.2740;

    mapOptions = {
      zoom: 8,
      center: new google.maps.LatLng(latitude, longitude)
    };

    scope.myMap = GMap2(document.getElementById("map"), mapOptions);
  };
});





/*

angular.module('notesApp')
.factory('Note', function ($resource) {
  return $resource('/api/notes/:noteId');
});

angular.module('notesApp')
.controller('MainCtrl', function ($scope, Note) {

  $scope.notes = Note.query();

  $scope.create = function(title, body) {
    Note.save({title: title, body: body}, function(note) {
      $scope.notes.push(note);
    });
  };

  $scope.delete = function(index) {
    Note.delete({noteId: $scope.notes[index].id}, function() {
      $scope.notes.splice(index, 1);
    });
  };

});

*/

