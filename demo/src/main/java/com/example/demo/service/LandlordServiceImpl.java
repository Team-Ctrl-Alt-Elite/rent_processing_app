//package com.example.demo.service;
//
//import com.example.demo.model.Landlord;
//import com.example.demo.repository.LandlordRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class LandlordServiceImpl implements LandlordService {
//    @Autowired
//    private LandlordRepository landlordRepository;
//    @Override
//    public List<Landlord> getAllLandlords() {
//        return (List<Landlord>) landlordRepository.findAll();
//    }
//
//    @Override
//    public Landlord getLandlordById(int id) {
//        Optional<Landlord> optionalLandlord = landlordRepository.findById(id);
//        return optionalLandlord.orElse(null);    }
//
//    @Override
//    public Landlord createLandlord(Landlord landlord) {
//        return landlordRepository.save(landlord);
//    }
//
//    @Override
//    public Landlord updateLandlord(int id, Landlord landlordDetails) {
//        Optional<Landlord> optionalLandlord = landlordRepository.findById(id);
//        if (optionalLandlord.isPresent()) {
//            Landlord existingLandlord = optionalLandlord.get();
//
//            // Check and update each field if provided in landlordDetails
//            if (landlordDetails.getFirst_name() != null) {
//                existingLandlord.setFirst_name(landlordDetails.getFirst_name());
//            }
//
//            if (landlordDetails.getLast_name() != null) {
//                existingLandlord.setLast_name(landlordDetails.getLast_name());
//            }
//
//            if (landlordDetails.getUsername() != null) {
//                existingLandlord.setUsername(landlordDetails.getUsername());
//            }
//
//            if (landlordDetails.getPass() != null) {
//                existingLandlord.setPass(landlordDetails.getPass());
//            }
//
//            if (landlordDetails.getPhone_number() != null) {
//                existingLandlord.setPhone_number(landlordDetails.getPhone_number());
//            }
//
//            return landlordRepository.save(existingLandlord);
//        }
//        return null;
//    }
//
//    @Override
//    public void deleteLandlord(int id) {
//        landlordRepository.deleteById(id);
//    }
//
//    // Other service methods for CRUD operations if needed
//}
