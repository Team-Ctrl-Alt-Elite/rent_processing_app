package com.example.demo.controller;

import com.example.demo.model.Contract;
import com.example.demo.repository.SecureUserRepository;
import com.example.demo.service.ContractService;
import com.example.demo.service.SecureUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
//CORS because react runs on a different port so in order to request access the below line is required
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/contract")
public class ContractController{

    @Autowired
    private ContractService contractService;
    @Autowired
    private SecureUserRepository secureUserRepository;
//The following endpoints basically joins users(landlords specifically) and Contracts table and returns the result in nice format

        @GetMapping("/customQuery")
    public ResponseEntity<List<Object[]>> getUsersAndContracts() {
        // Call the repository method that executes the custom query
        List<Object[]> result = secureUserRepository.findAllLandlordContracts();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/all")
    public List<Contract> getAllContracts() {
        return contractService.getAllContracts();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Contract> getContractById(@PathVariable Integer id) {
        Contract contract = contractService.getContractById(id);
        if (contract != null) {
            return ResponseEntity.ok(contract);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Contract> createContract(@RequestBody Contract contract) {
        Contract createdContract = contractService.createContract(contract);
        return ResponseEntity.ok(createdContract);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contract> updateContract(@PathVariable Integer id, @RequestBody Contract contractDetails) {
        Contract updatedContract = contractService.updateContract(id, contractDetails);
        if (updatedContract != null) {
            return ResponseEntity.ok(updatedContract);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContract(@PathVariable Integer id) {
        contractService.deleteContract(id);
        return ResponseEntity.noContent().build();
    }
    // Other endpoints for CRUD operations if needed
}
