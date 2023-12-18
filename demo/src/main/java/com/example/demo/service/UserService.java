package com.example.demo.service;

import com.example.demo.model.User;
import java.util.List;


public interface UserService {
    public List<User> getAllUsers();
    User getUserById(int id);
    User createUser(User user);
    User updateUser(int id, User userDetails);
    void deleteUser(int id);
    // Other service methods for CRUD   operations if needed
}
