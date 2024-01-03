package com.example.demo.controller;

import com.example.demo.model.SecureUser;
import com.example.demo.repository.SecureUserRepository;
import com.example.demo.service.SecureUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/landlord")
public class AdminController {

    @Autowired
    private SecureUserService secureUserService;

    @Autowired
    private SecureUserRepository secureUserRepository;

    @PostMapping("/access")
    public String helloAdminController() {
        return "Admin level access";
    }

    @GetMapping("/landlordContracts")
    public ResponseEntity<List<Map<String, Object>>> getAllLandlordContracts() {
        // Call the repository method that executes the custom query
        List<Object[]> result = secureUserRepository.findAllLandlordContracts();

        // Transform the Object[] result into List<Map<String, Object>>
        List<Map<String, Object>> transformedResult = new ArrayList<>();
        for (Object[] row : result) {
            Map<String, Object> map = new HashMap<>();
            // Assuming the columns are selected in the query, adjust the keys accordingly
            map.put("LandlordId", row[0]);
            map.put("Landlord_first_name", row[1]);
            map.put("Landlord_last_name", row[2]);
            map.put("Landlord_username", row[3]);
            map.put("Landlord_phonenumber", row[5]);
            map.put("contract_id", row[6]);
            map.put("unit", row[7]);
            map.put("monthly_rent", row[8]);
            map.put("lease_starting_date", row[9]);
            map.put("lease_ending_on", row[10]);
            map.put("tenant_id", row[12]);
            transformedResult.add(map);
        }
        return ResponseEntity.ok(transformedResult);
    }

    @GetMapping("/all")
    public List<SecureUser> getAllLandlord() {
        return secureUserService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SecureUser> getLandlordById(@PathVariable Integer id) {
        SecureUser landlord = secureUserService.getUserById(id);
        if (landlord != null) {
            return ResponseEntity.ok(landlord);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /*
     * @PostMapping
     * public ResponseEntity<Landlord> createLandlord(@RequestBody Landlord
     * landlord) {
     * Landlord createdLandlord = landlordService.createLandlord(landlord);
     * return ResponseEntity.ok(createdLandlord);
     * }
     */

    @PutMapping("/{id}")
    public ResponseEntity<SecureUser> updateLandlord(@PathVariable Integer id,
            @RequestBody SecureUser landlordDetails) {
        SecureUser updatedLandlord = secureUserService.updateUser(id, landlordDetails);
        if (updatedLandlord != null) {
            return ResponseEntity.ok(updatedLandlord);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /*
     * @DeleteMapping("/{id}")
     * public ResponseEntity<Void> deleteLandlord(@PathVariable Integer id) {
     * landlordService.deleteLandlord(id);
     * return ResponseEntity.noContent().build();
     * }
     */
}