    angular.module('controllers', [])
    .controller('EditTodoCtrl', function ($scope, mapService, todosService, infoWindowService, mapControlsService, NEW_TODO_ID) {
      var editPinImage,
        editMarker;

      $scope.editTodo = {};

      // editMarker Setup Start

      editPinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + "55FF00",
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));

      editMarker = new google.maps.Marker({
        title: "Drag Me",
        draggable: true,
        clickable: false,
        icon: editPinImage,
        position: new google.maps.LatLng(0, 0)
      });

      function editMarkerDragCallback (scope, myMarker) {
        return function () {
          var pos = myMarker.getPosition();
          scope.editTodo.lat = pos.lat();
          scope.editTodo.lng = pos.lng();
          if(!scope.$$phase) scope.$apply();
        };
      }
      google.maps.event.addListener(editMarker, 'drag', editMarkerDragCallback($scope, editMarker));

      function editMarkerDblClickCallback (scope) {
        return function () {
          scope.$apply(function () {
            scope.submitTodo();
          });
        };
      }
      google.maps.event.addListener(editMarker, 'dblclick', editMarkerDblClickCallback($scope));

      $scope.$watch('editTodo.lat + editTodo.lng', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          var pos = editMarker.getPosition(),
            latitude = pos.lat(),
            longitude = pos.lng();
          if ($scope.editTodo.lat !== latitude || $scope.editTodo.lng !== longitude)
            editMarker.setPosition(new google.maps.LatLng($scope.editTodo.lat || 0, $scope.editTodo.lng || 0));
        }
      });

      // editMarker Setup End

      $scope.$watch('controls.editTodo + controls.editTodoId', function () {
        var pos, todo = mapControlsService.editTodoId !== NEW_TODO_ID && todosService.getTodoById(mapControlsService.editTodoId);
        infoWindowService.close();
        if (mapControlsService.editTodo) {
          if (todo) {
            $scope.editTodo = {
              id: todo.id,
              title: todo.title,
              desc: todo.desc,
              lat: todo.lat,
              lng: todo.lng,
              comp: todo.completed,
              saveMsg: "Update Todo",
              cancelMsg: "Discard Changes"
            };
          } else {
            pos = mapService.getLatLng();
            $scope.editTodo = {
              id: NEW_TODO_ID,
              lat: pos.lat,
              lng: pos.lng,
              saveMsg: "Save Todo",
              cancelMsg: "Discard Todo"
            };
          }
          editMarker.setMap(mapService.getMap());
        }
      });

      $scope.submitTodo = function () {
        if ($scope.editTodoForm.$valid) {
          if ($scope.editTodo.id === NEW_TODO_ID)
            addTodo();
          else
            editTodo();
        }
      }

      $scope.resetCloseTodoForm = function () {
        editMarker.setMap(null);
        mapControlsService.editTodo = false;
        mapControlsService.editTodoId = NEW_TODO_ID;
        $scope.editTodo = {};
      }

      function addTodo () {
        todosService.addTodo(
          $scope.editTodo.title,
          $scope.editTodo.desc,
          $scope.editTodo.lat,
          $scope.editTodo.lng);
        $scope.resetCloseTodoForm();
      }

      function editTodo () {
        todosService.updateTodo(
          $scope.editTodo.id,
          $scope.editTodo.title,
          $scope.editTodo.desc,
          $scope.editTodo.lat,
          $scope.editTodo.lng,
          $scope.editTodo.comp);
        $scope.resetCloseTodoForm();
      }
    })









    .controller("HomeCtrl", function ($scope, $routeParams, categoriesService, meppesService) {

        $scope.categories = {};
        $scope.meppes = {};

        //if no category is selected => get all meppes, if category is selected => filter
        var optionalCategory = (typeof $routeParams.category === "undefined") ? "" : $routeParams.category;

        $scope.getCategories = function () {
          var promise = categoriesService.getAll();
          promise.then(function(data) {
            $scope.categories = data;
          }, function(data) {
            alert('Failed while getting categories: ' + data);
          });
        };

        $scope.getMeppes = function () {
          var promise = meppesService.getAll(optionalCategory);
          promise.then(function(data) {
            $scope.meppes = data;
          }, function(data) {
            alert('Failed while getting meppes: ' + data);
          });
        };



        function init () {
          $scope.getMeppes();
          $scope.getCategories();
        }

        init();

    });
