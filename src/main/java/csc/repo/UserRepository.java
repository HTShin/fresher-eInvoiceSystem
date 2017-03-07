package csc.repo;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import csc.models.User;

/**
 * A DAO for the entity User is simply created by extending the CrudRepository
 * interface provided by spring. The following methods are some of the ones
 * available from such interface: save, delete, deleteAll, findOne and findAll.
 * The magic is that such methods must not be implemented, and moreover it is
 * possible create new query methods working only by defining their signature!
 * 
 */
//@Transactional
@Repository
public interface UserRepository extends CrudRepository<User, Long> {

	/**
	 * Return the user having the passed email or null if no user is found.
	 * 
	 * @param email the user email.
	 */

	Page<User> findAll(Pageable pageable);

} // class UserDao
