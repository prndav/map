    angular.module('mapApp', ['controllers', 'services', 'directives'])
    .value('NEW_TODO_ID', -1)
    .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
          }).
          when('/meppe/:mapId', {
            templateUrl: 'views/meppe.html',
            controller: 'EditTodoCtrl'
          }).
          when('/categories', {
            templateUrl: 'views/categories.html',
            controller: 'CategoriesCtrl'
          }).
          when('/create', {
            templateUrl: 'views/create.html',
            controller: 'CreateMeppeCtrl'
          })
          .when('/:category', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
          }).
          otherwise({
            redirectTo: '/phones'
          })



      }]);



