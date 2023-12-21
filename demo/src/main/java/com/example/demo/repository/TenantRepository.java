//package com.example.demo.repository;
//
//
//import com.example.demo.model.Tenant;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.CrudRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//
//@Repository
//public interface TenantRepository extends CrudRepository<Tenant, Integer> {
//    // Add custom query methods if needed
//    @Query(value = "SELECT * FROM tenant t JOIN contract c ON t.tenant_id = c.tenant_id", nativeQuery = true)
//    List<Object[]> findAllTenantContracts();
//}
