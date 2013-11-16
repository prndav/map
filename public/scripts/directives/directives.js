myApp.directive('markers', [function(){
    return {
        link: function(scope, element, attr) {
          /*scope.$watch('myMarkers', function(){
            console.log(scope.myMarkers);

          })*/
        }
    };
}]);


myApp.directive('addmarker', [function(){
    return {
      scope:{
        addaction: '='
      },
      link: function(scope, element, attr) {
        $(element).find("#add").on('click', function(){
          var lat = scope.newMarkerLat;
          var lon = scope.newMarkerLong;
          var loc = {lat:lat, lon:lon};
          scope.addaction(loc);
        })
      }
    };
}]);



myApp.directive('pickCoords', function($rootScope) {
  return {
    restrict: 'A',

    link: function(scope, element, attrs) {
      $(element).on('click', function(){

        $rootScope.$emit('pickCoords');

      })
    }
  };
});
