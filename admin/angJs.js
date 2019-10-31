var app = angular.module("myApp",[]);

app.filter("age", function(){
    return function (goit){
        switch(goit.toString()){
            case "0":
              return "U";
            case "1":
              return "A";
            case "2":
              return "U/A"
        }
    }
})

app.filter("usertype", function(){
    return function (goit){
        switch(goit.toString()){
            case "0":
              return "User";
            case "1":
              return "Admin";
        }
    }
})

app.filter("cinema", function(){
    return function (goit){
        switch(goit.toString()){
            case "1":
              return "Sri Vishnu Cinema";
            case "2":
              return "PVR: Velocity, Silk Mill";
        }
    }
})

app.controller("sidebar", function($scope,$rootScope,$window){
  $rootScope.amov = true;
  $rootScope.umov = false;
  $rootScope.trans = false;
  $rootScope.user = false;

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = $window.document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  $rootScope.token = readCookie('token');
  if(!$rootScope.token){
    $window.alert('User signed off. Please Login again!!')
    $window.location.href='../signin';
  }

  $scope.addMov = function() {
    $rootScope.amov = true;
    $rootScope.umov = false;
    $rootScope.trans = false;
    $rootScope.user = false;
  }
  $scope.updateMov = function() {
    $rootScope.amov = false;
    $rootScope.umov = true;
    $rootScope.trans = false;
    $rootScope.user = false;
  }
  $scope.viewTrans = function() {
    $rootScope.amov = false;
    $rootScope.umov = false;
    $rootScope.trans = true;
    $rootScope.user = false;
  }
  $scope.viewUsers = function() {
    $rootScope.amov = false;
    $rootScope.umov = false;
    $rootScope.trans = false;
    $rootScope.user = true;
  }
})

app.controller("amovie", function($scope, $http, $rootScope) {
  $http({
    method: 'get',
    url: 'http://localhost:3000/movie/'
  })
  .then(function(response) {
    $rootScope.movs = response.data.movies;
    console.log($rootScope.movs);
    console.log('Total Movies : ' + response.data.count);
  })
})

app.controller("umovie", function($scope, $http, $rootScope) {
  $scope.update=true;
  $scope.umov = function(id,name,runtime,imdb,rt,age,desc) {
    $scope.update = false;
    $scope.id = id;
    $scope.name = name;
    $scope.runtime = runtime;
    $scope.imdb = imdb;
    $scope.rt = rt;
    $scope.desc = desc;
    $scope.age = age;
  }

  $scope.back = function() {
    $scope.update=true;
  }

  $scope.updatemovie = function() {
    $http({
      method:'patch',
      url:'http://localhost:3000/movie/'+$scope.id,
      data: {'name':$scope.name,'runtime':$scope.runtime,'imdb_rating':$scope.imdb,'rt_rating':$scope.rt,'description':$scope.desc,'age_rating':$scope.age},
      headers: {'Authorization': $rootScope.token}
    })
    .success(function(data) {
      alert("Movie details updated");
      $http({
        method: 'get',
        url: 'http://localhost:3000/movie/'
      })
      .then(function(response) {
        $rootScope.movs = response.data.movies;
        console.log($rootScope.movs);
        console.log('Total Movies : ' + response.data.count);
      })
    })
  }

  $scope.deletemovie = function() {
    $http({
      method:'delete',
      url:'http://localhost:3000/movie/'+$scope.id,
      headers: {'Authorization': $rootScope.token}
    })
    .success(function(data) {
      alert("Selected movie Deleted");
      $http({
        method: 'get',
        url: 'http://localhost:3000/movie/'
      })
      .then(function(response) {
        $rootScope.movs = response.data.movies;
        console.log($rootScope.movs);
        console.log('Total Movies : ' + response.data.count);
      })
    })
  }
})

app.controller("transactions", function($scope,$http,$rootScope){
  $http.get('fetchTrans.php')
  .then(function(response) {
    $scope.transactions = response.data;
    console.log($scope.transactions);
  })
})

app.controller("userdata", function($scope,$http,$rootScope){
  $http({
    method: 'get',
    url: 'http://localhost:3000/user/',
    headers: {'Authorization': $rootScope.token}
  })
  .then(function(response) {
    $rootScope.users = response.data.users;
    console.log($rootScope.users);
    console.log('Total Users : ' + response.data.count);
  })

  $scope.update=true;

  $scope.useru = function(id, name, phnum, email, type) {
    $scope.id = id;
    $scope.name = name;
    $scope.email = email;
    $scope.phnum = phnum;
    $scope.type = type;
    $scope.update=false;
  }

  $scope.back = function() {
    $scope.update=true;
  }

  $scope.userupdate = function() {
    $http({
      method:'post',
      url:'upuser.php',
      data: {'id':$scope.id,'phone':$scope.phnum,'name':$scope.name,'email':$scope.email,'pass':$scope.pass,'type':$scope.type}
    })
    .success(function(data) {
      alert(data);
      $http.get('userAll.php')
      .then(function(response) {
        $scope.users = response.data;
        console.log($scope.users);
      })
    })
  }
});
