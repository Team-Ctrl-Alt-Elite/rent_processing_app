package com.example.demo.service;

import com.example.demo.model.Contract;
import java.util.List;


public interface ContractService {
    public List<Contract> getAllContracts();
    Contract getContractById(int id);
    Contract createContract(Contract contract);
    Contract updateContract(int id, Contract contractDetails);
    void deleteContract(int id);
    // Other service methods for CRUD   operations if needed
}
