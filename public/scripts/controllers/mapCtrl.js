myApp.controller('MapCtrl', ['$scope', 'MarkersJsonService', function($scope, MarkersJsonService){

    var ll = new google.maps.LatLng(49.841775, 24.030688);

    MarkersJsonService.markers().then(function(markers){


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
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };


    //Markers should be added after map is loaded
    $scope.onMapIdle = function() {
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
    };

    $scope.addAction = function(loc){
        var lat = loc['lat'];
        var lon = loc['lon'];
        var ll = new google.maps.LatLng(lat, lon);

        var marker = new google.maps.Marker({
            map: $scope.myMap,
            position: ll
        });

        $scope.myMarkers.push(marker);
        console.log($scope.myMarkers)

    };


}])
