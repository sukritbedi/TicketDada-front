var app = angular.module("myApp",[]);

app.controller("loginSet",function($scope, $http, $window) {
  $scope.loginAction = function(email, pass) {
    if ((!email && !pass) || (email==="" || pass==="")){
      $window.alert("Login Failed. Please enter relevant items for authentication!");
    } else {
      $http({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data:{
          email_id: email,
          password: pass
        }
      })
      .then(function(response) {
        console.log(response.data.token);
        var d = new Date();
        d.setTime(d.getTime() + (60*60*1000));
        var expires = "expires=" + d.toGMTString();
        $window.document.cookie = 'token=Bearer ' + encodeURIComponent(response.data.token) + '; path=/; ' + expires;
        $window.location.href = '../'+ response.data.url+'/index.html';
      })
      .catch(function(error) {
        alert('Credential items combination not valid. Please re-enter the fields');
        $scope.email_id = "";
        $scope.password = "";
      })
    }
  }
})
