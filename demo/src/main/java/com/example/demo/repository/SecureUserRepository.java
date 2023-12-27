package com.example.demo.repository;

import com.example.demo.model.SecureUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SecureUserRepository extends JpaRepository<SecureUser, Integer> {
    Optional<SecureUser> findByUsername(String username);

    // Add custom query methods if needed
    @Query(value = "SELECT * from users u join contract c on u.user_id = c.landlord_id", nativeQuery = true)
    List<Object[]> findAllLandlordContracts();

    @Query(value = "select usr.user_id, r.authority from user_role_junction usr join roles_table r on usr.role_id = r.role_id where usr.user_id = :id", nativeQuery = true)
    List<Object[]> getAuthority(int id);

    @Query(value = "SELECT * from users u join contract c on u.user_id = c.tenant_id where c.tenant_id = :id", nativeQuery = true)
    List<Object[]> findAllTenantContracts(int id);

}