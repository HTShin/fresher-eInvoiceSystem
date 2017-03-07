package csc.config;

import java.math.BigDecimal;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import csc.repository.CustomerRepository;
import csc.repository.RoleRepository;
import csc.repository.UserRepository;
import csc.models.Customer;
import csc.models.Role;
import csc.models.Users;

@Component
public class DataSeedingListener implements ApplicationListener<ContextRefreshedEvent> {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private CustomerRepository customerRepository;

	@Override
	public void onApplicationEvent(ContextRefreshedEvent arg0) {
		// Roles
		if (roleRepository.findByName("ROLE_ADMIN") == null) {
			roleRepository.save(new Role("ROLE_ADMIN"));
		}

		if (roleRepository.findByName("ROLE_MEMBER") == null) {
			roleRepository.save(new Role("ROLE_MEMBER"));
		}
		Users tmp = new Users();
		// Admin account
		if (userRepository.findByUsername("admin@gmail.com") == null) {
			Users admin = new Users();
			admin.setUsername("admin@gmail.com");
			admin.setPassword(passwordEncoder.encode("123456"));
			HashSet<Role> roles = new HashSet<>();
			roles.add(roleRepository.findByName("ROLE_ADMIN"));
			roles.add(roleRepository.findByName("ROLE_MEMBER"));
			admin.setRoles(roles);
			tmp = userRepository.save(admin);
			createCustomer(tmp);

		}

		// Admin account
		if (userRepository.findByUsername("admin01@gmail.com") == null) {
			Users admin = new Users();
			admin.setUsername("admin01@gmail.com");
			admin.setPassword(passwordEncoder.encode("123456"));
			HashSet<Role> roles = new HashSet<>();
			roles.add(roleRepository.findByName("ROLE_ADMIN"));
			roles.add(roleRepository.findByName("ROLE_MEMBER"));
			admin.setRoles(roles);
			tmp = new Users();
			tmp = userRepository.save(admin);
			createCustomer(tmp);
		}

		// Member account
		if (userRepository.findByUsername("member@gmail.com") == null) {
			Users user = new Users();
			user.setUsername("member@gmail.com");
			user.setPassword(passwordEncoder.encode("123456"));
			HashSet<Role> roles = new HashSet<>();
			roles.add(roleRepository.findByName("ROLE_MEMBER"));
			user.setRoles(roles);
			tmp = new Users();
			tmp = userRepository.save(user);
			createCustomer(tmp);
		}
	}

	public void createCustomer(Users user) {
		Customer cus = new Customer();
		cus.setUser(user);
		cus.setAddress("test");
		cus.setEmail("test");
		cus.setNameCustomer("test");
		cus.setIdCustomer("test" + user.getId());
		cus.setPhone(12345671);
		cus.setTaxCode(Integer.parseInt("123457"));
		cus.setLimitConsume(BigDecimal.valueOf(1234));
		customerRepository.save(cus);

	} 

}
