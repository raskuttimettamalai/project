		angular.module('contact',[])
		.controller("contactmeCtrl",function($scope,$http)
    {
                $scope.myFunction= function(user)
                {
    				console.log(user);
    				alert("firstName:" + user.firstname +"\n "+"lastname:" +user.lastname+"\n "+"mobile:" +user.mobile+" \n"+"message:" +user.message);
                
              
            http(
            {

      				method: 'POST',
      				 url: "http://localhost:8080/contact",
       				data: user
      				
      				}).then(function(res){
      					console.log(res.data);
      					console.log(user);
                   if(res.data=="inserted")
                {
                  $scope.user={};
                  alert("success")
                }
      				}) 
            }
          });