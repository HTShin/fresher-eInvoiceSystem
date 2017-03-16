'use strict';

var app = angular.module('dbApp');

app.controller('InvoiceController', ['$scope','$filter', 'InvoiceService', 
                                     function($scope, $filter, InvoiceService) {
    var self = this;
    
    self.invoice={
    	id:null,
    	date:'',
    	contractNumber:'',
    	nameService:'',
    	indexConsumed:'',
    	total:'',
    	vat:'',
    	ptef:'10',
    	grandTotal:'',
    	idType:'',
    	idCpn:'',
    	idCustomer:'',
    	
    }; 
         
    self.typeInvoice={
        	id:null,
        	code:'',
        	nameInvoice:'',
        	description:'',        	
        	vat:'',        	
        }; 
    
    self.invoices=[];
    
    self.typeInvoices=[];
    
    function defaultValue() {
        $scope.currentPage = 0;
        $scope.pageSize = 5;    
        $scope.search = '';
       
        $scope.size = 5;
        //$scope.page = 1;
        $scope.totalElements = 0;
                     
        self.invoice.ptef = 10;        
                
    }

    
    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset = reset;    
    self.update = updateInvoice;
    self.showDetail = showDetail;
    self.changeTotal = changeTotal;

    defaultValue();
    fetchAllInvoice();
    fetchAllTypeInvoice();
    
    
    function changeTotal(){
    	self.invoice.total = self.invoice.indexConsumed * 3000;
    	self.invoice.grandTotal = self.invoice.total + ((self.invoice.total * self.invoice.vat)/100);
    }
    
    
    $scope.onEventPaging = function(value) {
    	$scope.size = value;
    	console.log('value ' + $scope.size + "-" + $scope.currentPage);
    	fetchAllInvoice();
    }
    
    $scope.onEventPreCurrentPage = function() {
    	$scope.currentPage = $scope.currentPage - 1;
    	console.log('value ' + $scope.size + "-" + $scope.currentPage);
    	fetchAllInvoice();
    }
    
    $scope.onEventNextCurrentPage = function() {
    	$scope.currentPage = $scope.currentPage + 1;
    	console.log('value ' + $scope.size + "-" + $scope.currentPage);
    	fetchAllInvoice();
    }
    
    
    $scope.getData = function () {
        
        return $filter('filter')( self.invoices, $scope.search)
       
      }
    
    $scope.numberOfPages=function(){
    	//console.log('$scope.totalElements ' + $scope.totalElements);
    	
    	// $scope.totalElements / pageSize
    	return Math.ceil($scope.totalElements/$scope.pageSize);
        //return Math.ceil($scope.getData().length/$scope.pageSize);                
    }

    function fetchAllInvoice(){
        InvoiceService.fetchAllInvoice($scope.size, $scope.currentPage)
            .then(
            function(d) {

            	self.invoices = d.content; 
            	$scope.totalElements = d.totalElements;
            	//console.log("d.totalElements" + d.totalElements);
            },
            function(errResponse){
                console.error('Error while fetching Invoice');
            }
        );
    }
    

    function fetchAllTypeInvoice(){
    	InvoiceService.fetchAllTypeInvoice()
            .then(
            function(d) {
            	console.log(d);
            	self.typeInvoices = d;            	
            },
            function(errResponse){
                console.error('Error while fetching Invoice');
            }
        );
    }
     

    function createInvoice(invoice){
    	console.log("create Invoice: " + invoice);
        InvoiceService.createInvoice(invoice)
            .then(
            fetchAllInvoice,
            function(errResponse){
                console.error('Error while creating Invoice');
            }
        );
    }

    function updateInvoice(invoice, id){    	
    	console.log(invoice);            
        InvoiceService.updateInvoice(invoice, id)
            .then(
            fetchAllInvoice, 
            function(errResponse){
                console.error('Error while updating Invoice');
            }
        );
    	
    }

    function deleteInvoice(id){
        InvoiceService.deleteInvoie(id)
            .then(
            fetchAllInvoive,
            function(errResponse){
                console.error('Error while deleting Invoice');
            }
        );
    }

    function submit() {
        if(self.invoice.id===null){
            console.log('Saving New Invoice', self.invoice);
            createInvoice(self.invoice);
        }else{
            updateInvoice(self.invoice, self.invoice.id);
            console.log('User updated with id ', self.invoice.id);
        }
        //reset();

    }

    function edit(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.invoices.length; i++){
            if(self.invoices[i].id === id) {
                self.invoice = angular.copy(self.invoices[i]);
               
                break;
            }
        }
    }
    function showDetail(code,id){    	   			
    	if(code == 'EB')
    	{
    		document.myForm.hidden = false;
    		document.getElementById('ptef2').hidden = true;
    		document.getElementById('service2').hidden = true;
    		document.getElementById('index2').hidden = false;
    	}	
    	if(code == 'WB')
    	{
    		document.myForm.hidden = false;
    		document.getElementById('ptef2').hidden = false;
    		document.getElementById('service2').hidden = true;
    		document.getElementById('index2').hidden = false;
    	}   
    	if(code == 'IB')
    	{
    		document.myForm.hidden = false;
    		document.getElementById('ptef2').hidden = true;
    		document.getElementById('service2').hidden = false;
    		document.getElementById('index2').hidden = true;
    	} 
    	if(code == 'PB')
    	{
    		document.myForm.hidden = false;
    		document.getElementById('ptef2').hidden = true;
    		document.getElementById('service2').hidden = false;
    		document.getElementById('index2').hidden = true;
    	} 
    	InvoiceService.getID(id)
        .then(
        		function(d) {
        			
                	self.invoice = d; 
                	self.invoice.date = new Date(self.invoice.date);
                	
                	//console.log("d.totalElements" + d.totalElements);
                },
        function(errResponse){
        	
            console.error('Error while updating Invoice');
        }
    );
    }
    
    function remove(id){
        console.log('id to be deleted', id);
        if(self.invoice.id === id) {//clean form if the user to be deleted is shown there.
            reset();
        }
        deleteInvoice(id);
    }

    function reset(){
    	self.invoice={
    	    	id:null,
    	    	date:'',
    	    	contractNumber:'',
    	    	nameService:'',
    	    	indexConsumed:'',
    	    	total:'',    	    	
    	    	grandTotal:'',
    	    	idType:'',
    	    	idCpn:'',
    	    	idCustomer:'',
    	    };
        $scope.myForm.$setPristine(); //reset Form
    }
  
    
    $scope.showForm = function(code, id){
    	self.invoice.idType = id; 
    	self.invoice.vat = id.vat;
    	$scope.name_type = id.nameInvoice;    			
    	if(code == 'EB')
    	{
    		document.myForm.hidden = false;
    		document.getElementById('ptef').hidden = true;
    		document.getElementById('service').hidden = true;
    		document.getElementById('index').hidden = false;
    	}	
    	if(code == 'WB')
    	{
    		document.myForm.hidden = false;
    		document.getElementById('ptef').hidden = false;
    		document.getElementById('service').hidden = true;
    		document.getElementById('index').hidden = false;
    	}   
    	if(code == 'IB')
    	{
    		document.myForm.hidden = false;
    		document.getElementById('ptef').hidden = true;
    		document.getElementById('service').hidden = false;
    		document.getElementById('index').hidden = true;
    	} 
    	if(code == 'PB')
    	{
    		document.myForm.hidden = false;
    		document.getElementById('ptef').hidden = true;
    		document.getElementById('service').hidden = false;
    		document.getElementById('index').hidden = true;
    	} 		
    };
   
   
$scope.clear = function(){
	reset();
	document.getElementById('btnset').disabled = true;
	console.log('clear form');
}
$scope.deleteinvoice = function(id){
	deleteInvoice(id);
	console.log('delete success' + id);
	
}
 $scope.myEnable = function(id){
    	    if(document.getElementById('btn').value == 'Edit'){
    		document.getElementById('btnset').disabled = false;
    		document.getElementById('btn').value ='Update';
    		console.log('enabled form');
    	    }
    	    else {
    	    	updateInvoice(self.invoice, id);
    	    	$('.modal-backdrop').remove();
        		console.log('update success!!');
        		       		
        	
        		
    	    }
        };
    }]);


app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});