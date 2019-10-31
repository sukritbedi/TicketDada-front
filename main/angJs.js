var app = angular.module("myApp",['ngCookies']);

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


          app.controller("movie_all", function($scope,$http,$rootScope,$window){
            $rootScope.main = true;
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

            $scope.token = readCookie('token');
            if(!$scope.token){
              $window.alert('User signed off. Please Login again!!')
              $window.location.href='../signin';
            }

            $http({
              method: 'get',
              url: 'http://localhost:3000/movie/'
            })
            .then(function(response) {
              $scope.movies = response.data.movies;
              console.log($scope.movies);
              console.log('Total Movies : ' + response.data.count);
            })

            $scope.moviebook1 = function(mov_id) {
              $rootScope.main = false;
              $rootScope.moviesel = true;

              $http({
  							method:'get',
  							url:'http://localhost:3000/movie/' + mov_id
  						})
              .then(function(response) {
                $rootScope.ms = response.data;
                console.log($rootScope.ms);
              })
            }
          });

          app.controller("movie_sel", function($scope, $rootScope, $http) {
            $http.get('fetchSch1.php')
            .then(function(response) {
              $scope.sch1s = response.data;
              console.log($scope.sch1s);
            })
            $http.get('fetchSch2.php')
            .then(function(response) {
              $scope.sch2s = response.data;
              console.log($scope.sch2s);
            })

            $scope.back = function() {
              $rootScope.main = true;
              $rootScope.moviesel = false;
            }

            $scope.bookticket = function(movid, time, loc) {
              $scope.movid = movid;
              $scope.time = time;
              $scope.loc = loc;
              $scope.timest = new Date();
              $http({
                method:'post',
                url:'dotransaction.php',
                data: {'movid':$scope.movid,'time':$scope.time,'loc':$scope.loc}
              })
              .success(function(data) {
                console.log(data);
                alert(data);
              })
            }
          });
