package com.example.demo;

import com.example.demo.model.Role;
import com.example.demo.model.SecureUser;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.SecureUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication() // exclude = {SecurityAutoConfiguration.class})
public class DemoApplication {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(DemoApplication.class, args);

	}

	@Bean
	CommandLineRunner run(RoleRepository roleRepository, SecureUserRepository secureUserRepository,
			PasswordEncoder passwordEncode) {
		return args -> {
			if (roleRepository.findByAuthority("LANDLORD").isPresent())
				return;
			Role adminRole = roleRepository.save(new Role("LANDLORD"));
			Role tenantRole = roleRepository.save(new Role("TENANT"));

			Set<Role> roles = new HashSet<>();
			roles.add(adminRole);
			roles.add(tenantRole);

			SecureUser admin = new SecureUser(1, "landlord@tenanttrack.com", passwordEncode.encode("password"),
					"landlord", "lastName", "1234567894", roles);

			secureUserRepository.save(admin);
		};
	};
}