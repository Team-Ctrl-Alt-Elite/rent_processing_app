//package com.example.demo.repository;
//
//import com.example.demo.model.Landlord;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.CrudRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//import java.util.Optional;
//
//@Repository
//public interface LandlordRepository extends JpaRepository<Landlord, Integer> {
//    // Add custom query methods if needed
//    @Query(value = "SELECT * FROM landlord l JOIN contract c ON l.landlord_id = c.landlord_id", nativeQuery = true)
//    List<Object[]> findAllLandlordContracts();
//
//}
