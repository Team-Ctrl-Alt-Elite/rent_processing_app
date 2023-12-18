package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
//CORS because React runs on a different port so in order to request access the below line is required
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    // The following endpoints basically joins users(landlords specifically) and Contracts table and returns the result in nice format
    @GetMapping("/landlordContracts")
    public ResponseEntity<List<Map<String, Object>>> getALlLandlordContracts() {
        // Call the repository method that executes the custom query
        List<Object[]> result = userRepository.findAllLandlordContracts();

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
            map.put("role", row[8]);
            map.put("contract_id", row[9]);
            map.put("unit", row[10]);
            map.put("monthly_rent", row[11]);
            map.put("lease_starting_date", row[12]);
            map.put("tenant_id", row[15]);
            transformedResult.add(map);
        }
        return ResponseEntity.ok(transformedResult);
    }

    @GetMapping("/all")
    public List<User> getAllLandlord() {
        return userService.getAllUsers();
    }
    @GetMapping("/{id}")
    public ResponseEntity<User> getLandlordById(@PathVariable Integer id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<User> createLandlord(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateLandlord(@PathVariable Integer id, @RequestBody User userDetails) {
        User updatedUser = userService.updateUser(id, userDetails);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLandlord(@PathVariable Integer id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
