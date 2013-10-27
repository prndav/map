myApp.controller('MapCtrl', function($scope){

    var ll = new google.maps.LatLng(13.0810, 80.2740);

    //Markers should be added after map is loaded
    $scope.onMapIdle = function() {
        console.log('idel')
        if ($scope.myMarkers === undefined){
            var marker = new google.maps.Marker({
                map: $scope.map,
                position: ll
            });
            $scope.myMarkers = [marker, ];
        }
    };

    $scope.markerClicked = function(m) {
        window.alert("clicked");
    }
})
