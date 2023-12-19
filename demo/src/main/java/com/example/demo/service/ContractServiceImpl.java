package com.example.demo.service;

import com.example.demo.model.Contract;
import com.example.demo.repository.ContractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContractServiceImpl implements ContractService {
    @Autowired
    private ContractRepository contractRepository;
    @Override
    public List<Contract> getAllContracts() {
        return (List<Contract>) contractRepository.findAll();
    }

    @Override
    public Contract getContractById(int id) {
        Optional<Contract> optionalContract = contractRepository.findById(id);
        return optionalContract.orElse(null);
    }

    @Override
    public Contract createContract(Contract contract) {
        return contractRepository.save(contract);
    }

    @Override
    public Contract updateContract(int id, Contract contractDetails) {
        Optional<Contract> optionalContract = contractRepository.findById(id);
        if (optionalContract.isPresent()) {
            Contract existingContract = optionalContract.get();

            if (contractDetails.getUnit_id() > 0) {
                existingContract.setUnit_id(contractDetails.getUnit_id());
            }

            if (contractDetails.getMonthly_rent() > 0) {
                existingContract.setMonthly_rent(contractDetails.getMonthly_rent());
            }
            if (contractDetails.getUnit_id() > 0) {
                existingContract.setUnit_id(contractDetails.getUnit_id());
            }

            if (contractDetails.getTenant_id() > 0) {
                existingContract.setTenant_id(contractDetails.getTenant_id());
            }
            return contractRepository.save(existingContract);
        }
        return null;
    }

    @Override
    public void deleteContract(int id) {
        contractRepository.deleteById(id);
    }
}
