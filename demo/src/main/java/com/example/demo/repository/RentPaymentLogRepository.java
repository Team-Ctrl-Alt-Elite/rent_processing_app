package com.example.demo.repository;

import com.example.demo.model.RentPaymentLog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RentPaymentLogRepository extends CrudRepository<RentPaymentLog, Integer> {
}
