package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    // Add custom query methods if needed
    @Query(value = "SELECT * FROM users u JOIN contract c ON u.user_id = c.landlord_id", nativeQuery = true)
    List<Object[]> findAllLandlordContracts();
}
