package com.example.demo.service;

import com.example.demo.model.RentPaymentLog;

import java.util.List;


public interface RentPaymentLogService {
    public List<RentPaymentLog> getAllRentPaymentLog();
    RentPaymentLog getRentPaymentLogById(int id);
    RentPaymentLog createRentPaymentLog(RentPaymentLog rentPaymentLog);

    // Other service methods for CRUD   operations if needed
}
