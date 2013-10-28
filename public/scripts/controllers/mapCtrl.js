myApp.controller('MapCtrl', ['$scope', 'MarkersJsonService', function($scope, MarkersJsonService){

    var ll = new google.maps.LatLng(13.0810, 80.2740);

    /*MarkersJsonService.markers().then(function(markers){
        console.log(markers)
    })*/

    $scope.mapOptions = {
        center: ll,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };



    //Markers should be added after map is loaded
    $scope.onMapIdle = function() {
        console.log('idel')
        if ($scope.myMarkers === undefined){
            var marker = new google.maps.Marker({
                map: $scope.myMap,
                position: ll
            });
            $scope.myMarkers = [marker, ];
        }
    };

    $scope.markerClicked = function(m) {
        window.alert("clicked");
    }
}])
