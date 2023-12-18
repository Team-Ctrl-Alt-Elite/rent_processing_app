package com.example.demo.repository;

import com.example.demo.model.Unit;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UnitRepository extends CrudRepository<Unit, Integer> {
    // Add custom query methods if needed
}
