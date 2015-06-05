angular.module('starter.services', [])

.factory('AuthenticationService',
    ['Base64', '$q', '$http','$rootScope',
    function (Base64, $q, $http, $rootScope) {
        var service = {};

        //function Login(username, password){
        service.Login = function (username, password) {
            var def = $q.defer();
        	var authdata = Base64.encode(username + ':' + password);
        	 
        	$http.defaults.headers.common['Authorization'] = authdata;
        	
            /* Use this for real authentication
             ----------------------------------------------*/
            $http.get('http://localhost:2359/Test/user', { username: username, password: password })
                .success(function (data) {
                	service = data;
                    def.resolve(data);
                    //callback(response);
                })
                .error(function() {
                    def.reject("Failed to get albums");
                });
            
            return def.promise;
 
        };
        
        return service;
    }]) 

.factory('TokenManage', function (Base64, localStorageService, $http, $rootScope) {
    var service = {};
    
    service.SetCredentials = function (username, password) {
        var authdata = Base64.encode(username + ':' + password);

        $rootScope.globals = {
            currentUser: {
                username: username,
                authdata: authdata
            }
        };

        $http.defaults.headers.common['Authorization'] = authdata;
        //localStorageService.set('globals', $rootScope.globals);
    };

    service.ClearCredentials = function () {
        $rootScope.globals = {};
        localStorageService.remove('globals');
        $http.defaults.headers.common.Authorization = '';
    };
    
    return service;
  
    /* jshint ignore:end */
})    
  
.factory('Base64', function () {
  
    return {
        encode: function (input) {
        	
	        var key = CryptoJS.enc.Utf8.parse('8080808080808080');  
	        var iv = CryptoJS.enc.Utf8.parse('8080808080808080');  
	  
	        var output = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(input), key,  
	        {  
	            keySize: 128 / 8,  
	            iv: iv,  
	            mode: CryptoJS.mode.CBC,  
	            padding: CryptoJS.pad.Pkcs7  
	        });   
  
            return output;
        }  
    };
  
    /* jshint ignore:end */
});