var app = angular.module('myApp', [ 'ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
    	templateUrl: "/EInvoice/views/home.html"
    })
    .when("/signup", {
        templateUrl : "/EInvoice/views/signup.html"
    }) 
    .when("/login", {
        templateUrl : "/EInvoice/views/login.html"
    }) 
    .when("/admin/manage", {
        templateUrl : "/EInvoice/views/userManagement.html"
    }) 
    .otherwise(
            { redirectTo: '/'}
    );
 
});