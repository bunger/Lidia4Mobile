angular.module('starter.controllers', [])
  
.controller('LoginController',function ($state, $scope, $http, AuthenticationService, TokenManage) {

    	$scope.message = {value: ''};
    	$scope.username = {value: 'jgarcia'};
    	$scope.password = {value: 'Put04mo'};
    	
        // reset login status
    	TokenManage.ClearCredentials();

        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username.value , $scope.password.value) 
            		.then(function() {
            			TokenManage.SetCredentials($scope.username.value , $scope.password.value);
                        $state.go('app.playlists', {}, {reload: true, inherit: false});
            			
            		},
            		function(data) {
                        console.log('albums retrieval failed.');
                        $scope.dataLoading = false;
            			
            		});
            	
            };
    })  

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})


.controller('PlaylistCtrl', function($scope, $stateParams) {
});


