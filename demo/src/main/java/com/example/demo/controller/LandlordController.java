package com.example.demo.controller;

import com.example.demo.model.Landlord;
import com.example.demo.repository.LandlordRepository;
import com.example.demo.service.LandlordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
// CORS because React runs on a different port so in order to request access the
// below line is required
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/landlord")
public class LandlordController {

    @Autowired
    private LandlordService landlordService;
    @Autowired
    private LandlordRepository landlordRepository;
    // The following endpoints basically joins users(landlords specifically) and
    // Contracts table and returns the result in nice format

    // @GetMapping("/customQuery")
    // public ResponseEntity<List<Object[]>> getUsersAndContracts() {
    // // Call the repository method that executes the custom query
    // List<Object[]> result = landlordRepository.findAllLandlordContracts();
    // return ResponseEntity.ok(result);
    // }

    @GetMapping("/landlordContracts")
    public ResponseEntity<List<Map<String, Object>>> getALlLandlordContracts() {
        // Call the repository method that executes the custom query
        List<Object[]> result = landlordRepository.findAllLandlordContracts();

        // Transform the Object[] result into List<Map<String, Object>>
        List<Map<String, Object>> transformedResult = new ArrayList<>();
        for (Object[] row : result) {
            Map<String, Object> map = new HashMap<>();
            // Assuming the columns are selected in the query, adjust the keys accordingly
            map.put("LandlordId", row[0]);
            map.put("Landlord_first_name", row[1]);
            map.put("Landlord_last_name", row[2]);
            map.put("Landlord_username", row[3]);
            map.put("Landlord_phonenumber", row[7]);
            map.put("contract_id", row[8]);
            map.put("unit", row[9]);
            map.put("monthly_rent", row[10]);
            map.put("lease_starting_date", row[11]);
            map.put("tenant_id", row[14]);
            transformedResult.add(map);
        }
        return ResponseEntity.ok(transformedResult);
    }

    @GetMapping("/all")
    public List<Landlord> getAllLandlord() {
        return landlordService.getAllLandlords();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Landlord> getLandlordById(@PathVariable Integer id) {
        Landlord landlord = landlordService.getLandlordById(id);
        if (landlord != null) {
            return ResponseEntity.ok(landlord);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Landlord> createLandlord(@RequestBody Landlord landlord) {
        Landlord createdLandlord = landlordService.createLandlord(landlord);
        return ResponseEntity.ok(createdLandlord);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Landlord> updateLandlord(@PathVariable Integer id, @RequestBody Landlord landlordDetails) {
        Landlord updatedLandlord = landlordService.updateLandlord(id, landlordDetails);
        if (updatedLandlord != null) {
            return ResponseEntity.ok(updatedLandlord);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLandlord(@PathVariable Integer id) {
        landlordService.deleteLandlord(id);
        return ResponseEntity.noContent().build();
    }
}
