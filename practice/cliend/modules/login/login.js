

angular.module('login',[])
.controller('loginCtrl', function($scope,$http,$location) {
    $scope.myLogin=function(logindata)
    {
    console.log(logindata);

    $http({
                method: "POST",
                url: "http://localhost:8080/logindata",
                data:logindata

            }).then(function(res) 
            {
                console.log(res);
                $scope.result=res.data;
                console.log($scope.result);
                if($scope.result=="success")
                {
                
                }
                else
                {   
                    window.alert("invalid");
                 }
            })
          }   
});