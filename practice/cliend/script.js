
var app = angular.module("myApp", ["ngRoute","contact","login"]);
app.config(function($routeProvider,$locationProvider) {
    $routeProvider
    .when("/home", {
    	templateUrl :"modules/home/home.html"
    })
    .when("/project", {
        templateUrl : "modules/project/project.html"
    })

    .when("/Qualification", {
    	templateUrl : "modules/qualification/qualification.html"
    })
    .when("/contact",{
    	templateUrl :"modules/contact/contact.html",
    	controller :"contactmeCtrl"
    })
    .when("/Login",{
        templateUrl: "modules/login/login.html",
        controller : "loginCtrl"
    })
    .otherwise({"redirectTo":'/home'})
    $locationProvider.html5Mode(true);
    
});

app.controller("nav",function($scope, $http){

        $http.get("http://localhost:8080/").then(function(response){
            console.log(response);
           $scope.navbar=response.data;
        }); 
 				

 				
 });

 
  
  	
 




     
