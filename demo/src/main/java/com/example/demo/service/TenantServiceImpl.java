//package com.example.demo.service;
//
//import com.example.demo.model.Tenant;
//import com.example.demo.repository.TenantRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class TenantServiceImpl implements TenantService {
//    @Autowired
//    private TenantRepository tenantRepository;
//    @Override
//    public List<Tenant> getAllTenants() {
//        return (List<Tenant>) tenantRepository.findAll();
//    }
//
//    @Override
//    public Tenant getTenantById(int id) {
//        Optional<Tenant> optionalTenant = tenantRepository.findById(id);
//        return optionalTenant.orElse(null);    }
//
//    @Override
//    public Tenant createTenant(Tenant tenant) {
//        return tenantRepository.save(tenant);
//    }
//
//    @Override
//    public Tenant updateTenant(int id, Tenant tenantDetails) {
//        Optional<Tenant> optionalTenant = tenantRepository.findById(id);
//        if (optionalTenant.isPresent()) {
//            Tenant existingTenant = optionalTenant.get();
//
//            // Check and update each field if provided in tenantDetails
//            if (tenantDetails.getFirst_name() != null) {
//                existingTenant.setFirst_name(tenantDetails.getFirst_name());
//            }
//
//            if (tenantDetails.getLast_name() != null) {
//                existingTenant.setLast_name(tenantDetails.getLast_name());
//            }
//
//            if (tenantDetails.getUsername() != null) {
//                existingTenant.setUsername(tenantDetails.getUsername());
//            }
//
//            if (tenantDetails.getPass() != null) {
//                existingTenant.setPass(tenantDetails.getPass());
//            }
//
//            if (tenantDetails.getPhone_number() != null) {
//                existingTenant.setPhone_number(tenantDetails.getPhone_number());
//            }
//
//            return tenantRepository.save(existingTenant);
//        }
//        return null;
//    }
//
//    @Override
//    public void deleteTenant(int id) {
//        tenantRepository.deleteById(id);
//    }
//
//
//    // Other service methods for CRUD operations if needed
//}
