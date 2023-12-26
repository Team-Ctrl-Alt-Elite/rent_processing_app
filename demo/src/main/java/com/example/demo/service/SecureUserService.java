package com.example.demo.service;

import com.example.demo.model.Role;
import com.example.demo.model.SecureUser;

import com.example.demo.repository.SecureUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class SecureUserService implements UserDetailsService {

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private SecureUserRepository secureUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // System.out.println("In the user details service");

        System.out.println(secureUserRepository.findByUsername(username));

        return secureUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Invalid User"));

        /*
         * if(!username.equals("ethan@fiserv.com")) throw new
         * UsernameNotFoundException("not Ethan");
         * Set<Role> roles = new HashSet<>();
         * roles.add(new Role(1, "USER"));
         * 
         * return new
         * SecureUser(1,"ethan@fiserv.com",encoder.encode("password"),"name",roles);
         */
    }

    public List<SecureUser> getAllUsers() {
        return (List<SecureUser>) secureUserRepository.findAll();
    }

    public SecureUser getUserById(int id) {
        Optional<SecureUser> optionalTenant = secureUserRepository.findById(id);
        return optionalTenant.orElse(null);
    }

    public SecureUser createUser(SecureUser user) {
        return secureUserRepository.save(user);
    }

    public SecureUser updateUser(int id, SecureUser user) {
        Optional<SecureUser> optionalTenant = secureUserRepository.findById(id);
        if (optionalTenant.isPresent()) {
            SecureUser existingTenant = optionalTenant.get();

            // Check and update each field if provided in tenantDetails
            if (user.getFirst_name() != null) {
                existingTenant.setFirst_name(user.getFirst_name());
            }

            if (user.getLast_name() != null) {
                existingTenant.setLast_name(user.getLast_name());
            }

            if (user.getUsername() != null) {
                existingTenant.setUsername(user.getUsername());
            }

            if (user.getPassword() != null) {
                existingTenant.setPassword(user.getPassword());
            }

            if (user.getPhone_number() != null) {
                existingTenant.setPhone_number(user.getPhone_number());
            }

            return secureUserRepository.save(existingTenant);
        }
        return null;
    }

    public void deleteUser(int id) {
        secureUserRepository.deleteById(id);
    }

}