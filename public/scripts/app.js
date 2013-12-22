    angular.module('mapApp', ['ui.state', 'controllers', 'services', 'directives'])
    .value('NEW_TODO_ID', -1)
    .config(['$stateProvider', '$routeProvider', '$urlRouterProvider',
            function ($stateProvider, $routeProvider, $urlRouterProvider) {
              $stateProvider.
              state('home', {
                url:'/',
                templateUrl: 'views/home.html/',
                controller: 'HomeCtrl'
              }).
              state('editMeppe', {
                url: '/meppe/:mapId',
                templateUrl: 'views/meppe.html',
                controller: 'EditTodoCtrl'
              }).
              state('createMeppe', {
                url: '/createMeppe',
                templateUrl: 'views/createMeppe.html',
                controller: 'CreateMeppeCtrl'
              }).
              state('manageCategories', {
                url: '/manageCategories',
                templateUrl: 'views/manageCategories.html',
                controller: 'ManageCategoriesCtrl'
              }).
              state('manageCategories.category', {
                url: '/:category',
                templateUrl: 'views/manageCategories.category.html',
                controller: 'ManageCategoryCtrl' //function($scope, $stateParams) {
              }).
              state('category', {
                url: '/:category',
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
              })

      }]);



