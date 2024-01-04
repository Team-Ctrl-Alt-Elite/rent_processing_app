package com.example.demo.service;

import com.example.demo.dto.LoginResponseDTO;
import com.example.demo.model.Role;
import com.example.demo.model.SecureUser;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.SecureUserRepository;
import jakarta.transaction.Transactional;
import org.antlr.v4.runtime.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class AuthenticationService {
    @Autowired
    private SecureUserRepository secureUserRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    public ResponseEntity<Object> registerUser(String username, String password, String first_name, String last_name) {
        if (secureUserRepository.findByUsername(username).isPresent())
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");

        String encodedPassword = passwordEncoder.encode(password);
        Role userRole = roleRepository.findByAuthority("TENANT").get();

        Set<Role> authorities = new HashSet<>();

        authorities.add(userRole);
        SecureUser newUser = new SecureUser(username, encodedPassword, first_name, last_name, null, authorities);
        secureUserRepository.save(newUser);

        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    // Takes in authentication manager and look for username and password, generate
    // auth token, ask token service to make token
    public LoginResponseDTO loginUser(String username, String password) {
        // sends username & password to authenticationManager, use UserDetailsService,
        // grab user, create token
        try {

            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password));

            String token = tokenService.generateJwt(auth);

            return new LoginResponseDTO(secureUserRepository.findByUsername(username).get(), token);

        } catch (Exception e) {
            System.out.println(e);
            return new LoginResponseDTO(null, "");
        }
    }
}