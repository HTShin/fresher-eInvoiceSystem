package csc.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import csc.models.Customer;
import csc.models.Users;

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Long>{
	
	Customer findById(Long id);
	
	Customer findByIdCustomer(String idcustomer);
	
	Customer findByUser(Users user);
	
	Customer findByEmail(String email);

}
