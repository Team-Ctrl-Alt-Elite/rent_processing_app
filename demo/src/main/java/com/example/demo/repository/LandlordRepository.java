package com.example.demo.repository;

import com.example.demo.model.Landlord;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LandlordRepository extends CrudRepository<Landlord, Integer> {
    // Add custom query methods if needed
}
