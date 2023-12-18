package com.example.demo.service;

import com.example.demo.model.User;
import java.util.List;


public interface UserService {
    public List<User> getAllLandlord();
    User getLandlordById(int id);
    User createLandlord(User user);
    User updateLandlord(int id, User userDetails);
    void deleteLandlord(int id);
    // Other service methods for CRUD   operations if needed
}
