myApp.controller('MapCtrl', ['$scope', 'MarkersJsonService', function($scope, MarkersJsonService){

    var ll = new google.maps.LatLng(49.841775, 24.030688);

    MarkersJsonService.markers().then(function(markers){
        console.log(markers);
        console.log('markers loaded');

        var tempArray = [];
        markers.forEach(function(marker,index){
            var ll = new google.maps.LatLng(marker['lat'], marker['long']);
            var marker = new google.maps.Marker({
                map:$scope.myMap,
                position:ll
            })
            tempArray.push(markers);
        })
        $scope.myMarkers = markers;
    })

    $scope.mapOptions = {
        center: ll,
        zoom: 12,
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
