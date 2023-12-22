package com.example.demo.controller;

import com.example.demo.model.Tenant;
import com.example.demo.repository.TenantRepository;
import com.example.demo.service.TenantService;
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
@RequestMapping("/tenant")
public class TenantController {

    @Autowired
    private TenantService tenantService;
    @Autowired
    private TenantRepository tenantRepository;
    // The following endpoints basically joins users(tenants specifically) and
    // Contracts table and returns the result in nice format

    // @GetMapping("/customQuery")
    // public ResponseEntity<List<Object[]>> getUsersAndContracts() {
    // // Call the repository method that executes the custom query
    // List<Object[]> result = tenantRepository.findAllTenantContracts();
    // return ResponseEntity.ok(result);
    // }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/tenantContracts")
    public ResponseEntity<List<Map<String, Object>>> getALlTenantContracts() {
        // Call the repository method that executes the custom query
        List<Object[]> result = tenantRepository.findAllTenantContracts();

        // Transform the Object[] result into List<Map<String, Object>>
        List<Map<String, Object>> transformedResult = new ArrayList<>();
        for (Object[] row : result) {
            Map<String, Object> map = new HashMap<>();
            // Assuming the columns are selected in the query, adjust the keys accordingly
            map.put("TenantId", row[0]);
            map.put("Tenant_first_name", row[1]);
            map.put("Tenant_last_name", row[2]);
            map.put("Tenant_username", row[3]);
            map.put("Tenant_phonenumber", row[7]);
            map.put("contract_id", row[8]);
            map.put("unit", row[9]);
            map.put("monthly_rent", row[10]);
            map.put("lease_starting_date", row[11]);
            map.put("tenant_id", row[14]);
            transformedResult.add(map);
        }
        return ResponseEntity.ok(transformedResult);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/all")
    public List<Tenant> getAllTenant() {
        return tenantService.getAllTenants();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    public ResponseEntity<Tenant> getTenantById(@PathVariable Integer id) {
        Tenant tenant = tenantService.getTenantById(id);
        if (tenant != null) {
            return ResponseEntity.ok(tenant);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public ResponseEntity<Tenant> createTenant(@RequestBody Tenant tenant) {
        Tenant createdTenant = tenantService.createTenant(tenant);
        return ResponseEntity.ok(createdTenant);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{id}")
    public ResponseEntity<Tenant> updateTenant(@PathVariable Integer id, @RequestBody Tenant tenantDetails) {
        Tenant updatedTenant = tenantService.updateTenant(id, tenantDetails);
        if (updatedTenant != null) {
            return ResponseEntity.ok(updatedTenant);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTenant(@PathVariable Integer id) {
        tenantService.deleteTenant(id);
        return ResponseEntity.noContent().build();
    }
}
