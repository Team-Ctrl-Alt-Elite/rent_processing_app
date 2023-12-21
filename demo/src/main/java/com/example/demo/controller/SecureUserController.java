package com.example.demo.controller;

import com.example.demo.model.SecureUser;
import com.example.demo.repository.SecureUserRepository;
import com.example.demo.service.SecureUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/tenant")
@CrossOrigin(origins = "http://localhost:3000")
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

    @PostMapping("/signIn")
    public String helloUserController(){

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

    /*@PostMapping
    public ResponseEntity<SecureUser> createTenant(@RequestBody SecureUser tenant) {
        SecureUser createdTenant = secureUserService.createTenant(tenant);
        return ResponseEntity.ok(createdTenant);
    }*/

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