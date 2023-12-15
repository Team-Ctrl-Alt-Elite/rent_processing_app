package com.example.demo.controller;

import com.example.demo.model.Landlord;
import com.example.demo.service.LandlordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
//CORS because react runs on a different port so in order to request access the below line is required
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/landlord")
public class LandlordController {

    @Autowired
    private LandlordService landlordService;

    @GetMapping("/all")
    public List<Landlord> getAllLandlord() {
        return landlordService.getAllLandlord();
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
    // Other endpoints for CRUD operations if needed
}
