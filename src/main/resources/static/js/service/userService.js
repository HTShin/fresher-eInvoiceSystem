'use strict';

angular.module('myApp').factory('UserService', ['$http', '$q', function($http, $q){

    var REST_SERVICE_URI = 'http://localhost:8080/EInvoice/user/';

    var factory = {
		login : loginUser,
        fetchAllUsers: fetchAllUsers,
        createUser: createUser,
        updateUser:updateUser,
        deleteUser:deleteUser
    };

    return factory;
    
    function loginUser(user) {
    	console.log('user ' + user);
        var deferred = $q.defer();
        $http.post("http://localhost:8080/EInvoice/" + "login", user)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while login Users');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }

    function fetchAllUsers() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + "getAll")
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching Users');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }

    function createUser(user) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI + "create", user)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while creating User');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }


    function updateUser(user, id) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI + "update/" +id, user)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while updating User');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }

    function deleteUser(id) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + "delete/" +id)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while deleting User');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }

}]);

//angular.module('myApp').factory('sessionInjector', ['SessionService', function(SessionService) {  
//    var sessionInjector = {
//        request: function(config) {
//            if (!SessionService.isAnonymus) {
//                config.headers['x-session-token'] = SessionService.token;
//            }
//            return config;
//        }
//    };
//    return sessionInjector;
//}]);
//module.config(['$httpProvider', function($httpProvider) {  
//    $httpProvider.interceptors.push('sessionInjector');
//}]);

//angular.module('myApp', ['spring-security-csrf-token-interceptor']);
//.config(function(csrfProvider) {
//    // optional configurations
//    csrfProvider.config({
//        url: 'user/login',
//        maxRetries: 3,
//        csrfHttpType: 'post',
//        csrfTokenHeader: 'X-CSRF-XXX-TOKEN',
//        httpTypes: ['PUT', 'POST', 'DELETE'] //CSRF token will be added only to these method types 
//    });
//}).run(function() {
//});
