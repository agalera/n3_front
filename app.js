
angular.module('n3App', ['ngRoute'])
  .config(function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: '/partials/news.html',
        controller: 'news'
      })
      .when('/comments/:commentId', {
        templateUrl: '/partials/comments.html',
        controller:  'comments'
      })
      .when('/about', {
        templateUrl: '/partials/about.html',
        controller:  'about'
      })
      .when('/admin', {
        templateUrl: '/partials/about.html',
        controller:  'about'
      })
      .when('/admin', {
        templateUrl: '/partials/admin.html',
        controller:  'admin'
      })
      .when('/logout', {
        templateUrl: '/partials/about.html',
        controller:  'logout'
      })
      .otherwise({ redirectTo: '/' });
  })
  .controller('news', [function(){
    console.log("news");
  }])
  .controller('comments', [function(){
    console.log("comments");
  }])
  .controller('about', [function(){
    console.log("about");
  }])
  .controller('admin', [function(){
    console.log("admin");
  }])
  .controller('logout', [function(){
    console.log("logout");
  }])