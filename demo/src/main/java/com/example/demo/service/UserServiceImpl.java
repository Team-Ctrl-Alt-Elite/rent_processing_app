package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public List<User> getAllLandlord() {
        return (List<User>) userRepository.findAll();
    }

    @Override
    public User getLandlordById(int id) {
        Optional<User> optionalLandlord = userRepository.findById(id);
        return optionalLandlord.orElse(null);    }

    @Override
    public User createLandlord(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateLandlord(int id, User userDetails) {
        Optional<User> optionalLandlord = userRepository.findById(id);
        if (optionalLandlord.isPresent()) {
            User existingUser = optionalLandlord.get();

            // Check and update each field if provided in landlordDetails
            if (userDetails.getFirst_name() != null) {
                existingUser.setFirst_name(userDetails.getFirst_name());
            }

            if (userDetails.getLast_name() != null) {
                existingUser.setLast_name(userDetails.getLast_name());
            }

            if (userDetails.getUsername() != null) {
                existingUser.setUsername(userDetails.getUsername());
            }

            if (userDetails.getPass() != null) {
                existingUser.setPass(userDetails.getPass());
            }

            if (userDetails.getPhone_number() != null) {
                existingUser.setPhone_number(userDetails.getPhone_number());
            }

            return userRepository.save(existingUser);
        }
        return null;
    }

    @Override
    public void deleteLandlord(int id) {
        userRepository.deleteById(id);
    }


    // Other service methods for CRUD operations if needed
}
