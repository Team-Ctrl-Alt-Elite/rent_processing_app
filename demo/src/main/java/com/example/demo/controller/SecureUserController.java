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
@RequestMapping("/tenant")
public class SecureUserController {

    @Autowired
    private SecureUserService secureUserService;

    @Autowired
    private SecureUserRepository secureUserRepository;

    @GetMapping("/customQuery")
    public ResponseEntity<List<Object[]>> getAllLandlordContracts() {
        // Call the repository method that executes the custom query
        List<Object[]> result = secureUserRepository.findAllLandlordContracts();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/tenantContracts/{id}")
    public ResponseEntity<List<Map<String, Object>>> getTenantContracts(@PathVariable Integer id) {
        // Call the repository method that executes the custom query
        List<Object[]> result = secureUserRepository.findAllTenantContracts(id);

        // Transform the Object[] result into List<Map<String, Object>>
        List<Map<String, Object>> transformedResult = new ArrayList<>();
        for (Object[] row : result) {
            Map<String, Object> map = new HashMap<>();
            // Assuming the columns are selected in the query, adjust the keys accordingly
            map.put("tenant_Id", row[0]);
            map.put("Tenant_first_name", row[1]);
            map.put("Tenant_last_name", row[2]);
            map.put("Tenant_username", row[3]);
            map.put("Tenant_phonenumber", row[5]);
            map.put("contract_id", row[6]);
            map.put("unit", row[7]);
            map.put("monthly_rent", row[8]);
            map.put("lease_starting_date", row[9]);
            map.put("lease_ending_on", row[10]);
            map.put("landlord_Id", row[11]);
            transformedResult.add(map);
        }
        return ResponseEntity.ok(transformedResult);
    }

    @PostMapping("/signIn")
    public String helloUserController() {

        return "User access level";
    }

    @GetMapping("/all")
    public List<SecureUser> getAllTenants() {
        return secureUserService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SecureUser> getTenantById(@PathVariable Integer id) {
        SecureUser tenant = secureUserService.getUserById(id);
        if (tenant != null) {
            return ResponseEntity.ok(tenant);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /*
     * @PostMapping
     * public ResponseEntity<SecureUser> createTenant(@RequestBody SecureUser
     * tenant) {
     * SecureUser createdTenant = secureUserService.createTenant(tenant);
     * return ResponseEntity.ok(createdTenant);
     * }
     */

    @PutMapping("/{id}")
    public ResponseEntity<SecureUser> updateTenant(@PathVariable Integer id, @RequestBody SecureUser tenantDetails) {
        SecureUser updatedTenant = secureUserService.updateUser(id, tenantDetails);
        if (updatedTenant != null) {
            return ResponseEntity.ok(updatedTenant);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTenant(@PathVariable Integer id) {
        secureUserService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

}