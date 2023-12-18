package com.example.demo.controller;


import com.example.demo.model.RentPaymentLog;
import com.example.demo.service.RentPaymentLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
//CORS because react runs on a different port so in order to request access the below line is required
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/rentPaymentLog")
public class RentPaymentLogController{

    @Autowired
    private RentPaymentLogService rentPaymentLogService;

    @GetMapping("/all")
    public List<RentPaymentLog> getAllRentPaymentLog() {
        return rentPaymentLogService.getAllRentPaymentLog();
    }
    @GetMapping("/{id}")
    public ResponseEntity<RentPaymentLog> getRentPaymentLogById(@PathVariable Integer id) {
        RentPaymentLog rentPaymentLog = rentPaymentLogService.getRentPaymentLogById(id);
        if (rentPaymentLog != null) {
            return ResponseEntity.ok(rentPaymentLog);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<RentPaymentLog> createRentPaymentLog(@RequestBody RentPaymentLog rentPaymentLog) {
        RentPaymentLog createdRentPaymentLog = rentPaymentLogService.createRentPaymentLog(rentPaymentLog);
        return ResponseEntity.ok(createdRentPaymentLog);
    }

}
