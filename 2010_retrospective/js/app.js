var app = angular.module('app', ['ngRoute', 'ngAnimate']);

var pages = [{name: 'Introduction', url: '#/'}, {name: 'Debuts', url: '#/debuts'}, {name: 'Top Artists', url: '#/topartists'}, {name: 'Streaks', url: '#/streaks'}];

app.config(function($routeProvider){
  $routeProvider.when('/', {
    controller: 'mainCtrl',
    templateUrl: 'intro.html'
  }).when('/topartists', {
    controller: 'topArtistsCtrl',
    templateUrl: 'topartists.html'
  }).when('/debuts', {
    controller: 'debutsCtrl',
    templateUrl: 'debuts.html'
  }).when('/streaks', {
    controller: 'streaksCtrl',
    templateUrl: 'streaks.html'
  })
  .otherwise('/');
});

app.run(function ($templateCache){
  $templateCache.put('intro.html');
});

app.controller('mainCtrl', function($scope) {
  $scope.pageClass = 'page-intro';
  $scope.menuOut = false;
  $scope.menuOutClass = "menuIn";
  $scope.pageNumber = 0;
  $scope.pages = pages;

  $scope.toggleMenu = function() {
    if ($scope.menuOut) {
      $scope.menuOutClass = "menuIn";
      $scope.menuOut = false;
    } else {
      $scope.menuOutClass = "menuOut";
      $scope.menuOut = true;
    }
    //$scope.$apply();
  }
});

app.controller('topArtistsCtrl', function($scope) {
    $scope.pageClass = 'page-topartists';
    $scope.menuOut = false;
    $scope.menuOutClass = "menuIn";
    $scope.pageNumber = 2;
    $scope.pages = pages;

    $scope.toggleMenu = function() {
      if ($scope.menuOut) {
        $scope.menuOutClass = "menuIn";
        $scope.menuOut = false;
      } else {
        $scope.menuOutClass = "menuOut";
        $scope.menuOut = true;
      }
    }
});

app.controller('debutsCtrl', function($scope) {
    $scope.pageClass = 'page-debuts';
    $scope.menuOut = false;
    $scope.menuOutClass = "menuIn";
    $scope.pageNumber = 1;
    $scope.pages = pages;

    $scope.toggleMenu = function() {
      if ($scope.menuOut) {
        $scope.menuOutClass = "menuIn";
        $scope.menuOut = false;
      } else {
        $scope.menuOutClass = "menuOut";
        $scope.menuOut = true;
      }
    }
});

app.controller('streaksCtrl', function($scope) {
    $scope.pageClass = 'page-streaks';
    $scope.menuOut = false;
    $scope.menuOutClass = "menuIn";
    $scope.pageNumber = 3;
    $scope.pages = pages;

    $scope.toggleMenu = function() {
      if ($scope.menuOut) {
        $scope.menuOutClass = "menuIn";
        $scope.menuOut = false;
      } else {
        $scope.menuOutClass = "menuOut";
        $scope.menuOut = true;
      }
    }
});