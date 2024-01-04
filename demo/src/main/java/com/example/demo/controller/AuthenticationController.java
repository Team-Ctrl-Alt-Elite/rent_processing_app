package com.example.demo.controller;

import com.example.demo.dto.LoginResponseDTO;
import com.example.demo.dto.RegistrationDTO;
import com.example.demo.model.SecureUser;
import com.example.demo.repository.SecureUserRepository;
import com.example.demo.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private SecureUserRepository secureUserRepository;

    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody RegistrationDTO body) {
        return authenticationService.registerUser(body.getUsername(), body.getPassword(), body.getFirst_name(),
                body.getLast_name());
    }

    @PostMapping("/login")
    public LoginResponseDTO loginUser(@RequestBody RegistrationDTO body) {
        return authenticationService.loginUser(body.getUsername(), body.getPassword());
    }

    @GetMapping("/getRole/{id}")
    public ResponseEntity<List<Map<String, Object>>> getUserAuthority(@PathVariable int id) {
        // Call the repository method that executes the custom query
        List<Object[]> result = secureUserRepository.getAuthority(id);

        // Transform the Object[] result into List<Map<String, Object>>
        List<Map<String, Object>> transformedResult = new ArrayList<>();
        for (Object[] row : result) {
            Map<String, Object> map = new HashMap<>();
            // Assuming the columns are selected in the query, adjust the keys accordingly
            map.put("userId", row[0]);
            map.put("authority", row[1]);

            transformedResult.add(map);
        }
        return ResponseEntity.ok(transformedResult);
    }

}