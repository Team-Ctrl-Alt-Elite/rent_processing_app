package com.example.demo.service;

import com.example.demo.model.RentPaymentLog;
import com.example.demo.repository.RentPaymentLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RentPaymentLogServiceImpl implements RentPaymentLogService{
    @Autowired
    private RentPaymentLogRepository rentPaymentLogRepository;
    @Override
    public List<RentPaymentLog> getAllRentPaymentLog() {
        return (List<RentPaymentLog>) rentPaymentLogRepository.findAll();
    }

    @Override
    public RentPaymentLog getRentPaymentLogById(int id) {
        Optional<RentPaymentLog> optionalRentPaymentLog = rentPaymentLogRepository.findById(id);
        return optionalRentPaymentLog.orElse(null);
    }

    @Override
    public RentPaymentLog createRentPaymentLog(RentPaymentLog rentPaymentLog) {
        return rentPaymentLogRepository.save(rentPaymentLog);
    }
}
