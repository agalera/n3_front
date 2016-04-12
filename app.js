
function get_user(cookies){
  token = cookies.getObject("n3_token");
  if (token != undefined)
  {
    token = JSON.parse(atob(token.split("?")[1]));
  }
  return token;
}

angular.module('n3App', ['ngRoute', 'ngSanitize', 'ngCookies'])
  .config(function($locationProvider, $routeProvider, $sceProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: '/static/partials/news.html',
        controller: 'news'
      })
      .when('/comments/:commentId', {
        templateUrl: '/static/partials/comments.html',
        controller:  'comments'
      })
      .when('/about', {
        templateUrl: '/static/partials/about.html',
        controller:  'about'
      })
      .when('/admin', {
        templateUrl: '/static/partials/admin.html',
        controller:  'admin'
      })
      .when('/search/page/:page/tags/:tag', {
        templateUrl: '/static/partials/search_tags.html',
        controller:  'tags'
      })
      .otherwise({ redirectTo: '/' });
  })
  .run(function($rootScope, $cookies){
    $rootScope.user = get_user($cookies);
  })
  .controller('news', function($rootScope, $scope, $http, $sce){
    $http({ method: 'GET', url: '/api/news' }).
      success(function (data, status, headers, config) {
        $rootScope.title = "News";
        $scope.data = data;
   	    $scope.data.news.result.map(function(v){
	        return angular.extend(v, {
            texto: $sce.trustAsHtml(v.texto)
  	   });
	    });
    });
  })
  .controller('comments', function($rootScope, $scope, $http, $sce, $routeParams){
    console.log($routeParams);
    $http({ method: 'GET', url: '/api/comments/' + $routeParams.commentId }).
      success(function (data, status, headers, config) {
        $rootScope.title = data.title;
        data.texto = $sce.trustAsHtml(data.texto);
        data._id = $sce.trustAsUrl(data._id);
        document.comment.action='/api/new_comment/'+data._id;
        $scope.data = data;
      });
  })
  .controller('tags', function($rootScope, $scope, $http, $sce, $routeParams){
    $http({ method: 'GET', url: '/api/search/page/'+ $routeParams.page +'/tags/' + $routeParams.tag }).
      success(function (data, status, headers, config) {
        $rootScope.title = "Search "+ $routeParams.tag;
        $scope.data = data;
        $scope.data.news.result.map(function(v){
          return angular.extend(v, {
            texto: $sce.trustAsHtml(v.texto)
       });
      });
    });
  })
  .controller('about', function($rootScope){
    $rootScope.title = "About";
  })
  .controller('admin', function($rootScope){
    $rootScope.title = "Admin";
  })
