package com.example.demo.repository;

import com.example.demo.model.Contract;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContractRepository extends CrudRepository<Contract, Integer> {
    // Add custom query methods if needed
}
