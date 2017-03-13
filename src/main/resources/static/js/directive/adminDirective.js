var app = angular.module('dbApp');

app.directive('dbAdmin', function() {
	return {
		templateUrl : "/EInvoice/views/admin/dashboardAdmin.html"
	}
});
app.directive('dbMainAdmin', function() {
	return {
		templateUrl : "/EInvoice/views/admin/templatedbAdmin.html"
	}
});

app.directive('dbCustomer', function() {
	return {
		templateUrl : "/EInvoice/views/customer/dashboardCustomer.html"
	}
});

app.directive('listUser', function() {
	return {
		templateUrl : "/EInvoice/views/admin/list.html"
	}
});

app.directive('userForm', function() {
	return {
		templateUrl : "/EInvoice/views/admin/user-form.html"
	}
});

app.directive('listInvoice', function() {
	return {
		templateUrl : "/EInvoice/views/customer/listInvoice.html"
	}
});
