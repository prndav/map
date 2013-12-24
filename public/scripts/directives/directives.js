var d = angular.module('directives', []);

    d.directive('modalWindow', function () {
      return {

        restrict: "EA",
        transclude: true,
        template:  "<div class='meppe-modal modal-dialog' ng-transclude></div><div class='overlay'>teste</div>",
        link: function () {

        }
      }
    })

    d.directive('todoMaps', function ($compile) {
      return {
        controller: function ($scope, $location, mapService, mapControlsService, infoWindowService, pointsService, markersService) {
          if ($location.path() === '') {
            $location.path('/');
          }

          $scope.location = $location;
          $scope.infow = infoWindowService;
          $scope.controls = mapControlsService;

          this.registerInfoWindow = function (myInfoWindow) {
            infoWindowService.registerInfoWindow(myInfoWindow);
          };

          this.registerMap = function (myMap) {
            mapService.setMap(myMap);
            $scope.todos = pointsService;
          };

          /*$scope.$watch('location.path()', function (path) {
            todosService.filter = (path === '/active') ?
              { completed: false } : (path === '/completed') ?
              { completed: true } : null;
          });*/

          $scope.$watch('location.path() + todos.nextId + todos.remainingCount()', function () {
            var i,
              todos = pointsService.filtered(),
              map = mapService.getMap(),
              todoId,
              marker,
              markers = markersService.markers,
              markerId,
              uniqueTodos = {};

            function addMarkerByTodoIndex (todoIndex) {
              var marker,
                markerOptions,
                todo = todos[todoIndex];

              markerOptions = {
                map: map,
                title: todo.title,
                position: new google.maps.LatLng(todo.lat, todo.lng)
              };
              marker = new google.maps.Marker(markerOptions);
              marker.setValues({
                id: todo.id,
                desc: todo.desc
              });
              markersService.markers.push(marker);

              function markerClickCallback (scope, todoId) {
                return function () {
                  scope.$apply(function () {
                    mapControlsService.openInfoWindowByTodoId(todoId);
                  });
                };
              }
              google.maps.event.addListener(marker, 'click', markerClickCallback($scope, todo.id));

              function markerDblClickCallback (scope, todoId) {
                return function () {
                  scope.$apply(function () {
                    mapControlsService.editTodoById(todoId);
                  });
                };
              }
              google.maps.event.addListener(marker, 'dblclick', markerDblClickCallback($scope, todo.id));
            }

            for (i = todos.length - 1; i >= 0; i--) {
              uniqueTodos[todos[i].id] = i;
            }

            for (i = markers.length - 1; i >= 0; i--) {
              marker = markers[i];
              markerId = marker.get("id");
              if (uniqueTodos[markerId] !== undefined) {
                delete uniqueTodos[markerId];
              } else {
                marker.setMap(null);
                markers.splice(i,1);
              }
            }

            for (todoId in uniqueTodos) {
              if (uniqueTodos.hasOwnProperty(todoId)) {
                addMarkerByTodoIndex(uniqueTodos[todoId]);
              }
            }
          });
        },
        link: function (scope, elem, attrs, ctrl) {
          var mapOptions,
            latitude = attrs.latitude,
            longitude = attrs.longitude,
            infoWindowTemplate,
            infoWindowElem,
            infowindow,
            todosControlTemplate,
            todosControlElem,
            editTodoControlTemplate,
            editTodoControlElem,
            mapStyles,
            map;

          latitude = latitude && parseFloat(latitude, 10) || 43.074688;
          longitude = longitude && parseFloat(longitude, 10) || -89.384294;

          infoWindowTemplate = document.getElementById('infoWindowTemplate').innerHTML.trim();
          infoWindowElem = $compile(infoWindowTemplate)(scope);
          infowindow = new google.maps.InfoWindow({
            content: infoWindowElem[0]
          });

          ctrl.registerInfoWindow(infowindow);

          mapStyles = [{
            featureType: 'all',
            stylers: [
              {hue: '#0000b0'},
              {invert_lightness: 'true'},
              {saturation: -30}
            ]
          }];

          mapOptions = {
            zoom: 12,
            disableDefaultUI: true,
            center: new google.maps.LatLng(latitude, longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: mapStyles
          };

          google.maps.visualRefresh = true;

          map = new google.maps.Map(elem[0], mapOptions);

          ctrl.registerMap(map);

          todosControlTemplate = document.getElementById('todosControlTemplate').innerHTML.trim();
          todosControlElem = $compile(todosControlTemplate)(scope);
          map.controls[google.maps.ControlPosition.TOP_LEFT].push(todosControlElem[0]);

          editTodoControlTemplate = document.getElementById('editTodoControlTemplate').innerHTML.trim();
          /*$.ajax(
            {
              url: '../../views/editTodo.html',
              success: function (data) {
                editTodoControlTemplate = data;
              },
              async: false
          });*/


          editTodoControlElem = $compile(editTodoControlTemplate)(scope);
          map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(editTodoControlElem[0]);
        }
      };
    });

    d.directive('navMenuDirective', ['$location', '$timeout', function($location, $timeout) {
      return {
        restrict: "EA",
        link: function(scope, element, attrs) {

          var link, currentLink, i,
              urlMap = {};

          // Menu updating logic

          scope.$on('$stateChangeSuccess', setMenuActive);

          scope.$watch("categoriesLoaded", function (loaded) {
            if(loaded == true) {
              $timeout(function () {
                var links = element.find('a');

                for (i = 0; i < links.length; i++) {
                  link = angular.element(links[i]);
                  var href = link.attr('href').replace(/^\/#/, '');
                  urlMap[href] = link;
                }
                setMenuActive();
              })
            }
          })

          function setMenuActive() {
            if(scope.categoriesLoaded) {
              var pathLink = urlMap[$location.path()];
              $('.on').removeClass('on');
              if (pathLink) {
                pathLink.addClass('on');
              }
            }
          }

          // end Menu updating logic


        }
      }
  }])
