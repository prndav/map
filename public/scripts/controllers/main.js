//Add the requried module 'angular-ui' as a dependency
angular.module('maptesting', []).directive('helloMaps', function () {
  return function (scope, elem, attrs) {
    var mapOptions,
      latitude = attrs.latitude,
      longitude = attrs.longitude,
      map;

    latitude = latitude && parseFloat(latitude, 10) || 43.074688;
    longitude = longitude && parseFloat(longitude, 10) || -89.384294;

    mapOptions = {
      zoom: 8,
      center: new google.maps.LatLng(latitude, longitude)
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    console.log(map)
  };
});
/**
 * General-purpose Event binding. Bind any event not natively supported by Angular
 * Pass an object with keynames for events to ui-event
 * Allows $event object and $params object to be passed
 *
 * @example <input ui-event="{ focus : 'counter++', blur : 'someCallback()' }">
 * @example <input ui-event="{ myCustomEvent : 'myEventHandler($event, $params)'}">
 *
 * @param ui-event {string|object literal} The event to bind to as a string or a hash of events with their callbacks
 */
angular.module('ui.event',[]).directive('uiEvent', ['$parse',
  function ($parse) {
    return function ($scope, elm, attrs) {
      var events = $scope.$eval(attrs.uiEvent);
      angular.forEach(events, function (uiEvent, eventName) {
        var fn = $parse(uiEvent);
        elm.bind(eventName, function (evt) {
          var params = Array.prototype.slice.call(arguments);
          //Take out first paramater (event object);
          params = params.splice(1);
          fn($scope, {$event: evt, $params: params});
          if (!$scope.$$phase) {
            $scope.$apply();
          }
        });
      });
    };
  }]);





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

