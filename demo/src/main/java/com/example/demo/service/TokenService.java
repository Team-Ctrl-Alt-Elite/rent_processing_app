package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.stream.Collectors;

@Service
public class TokenService {
    @Autowired
    private JwtEncoder jwtEncoder;

    @Autowired
    private JwtDecoder jwtDecoder;

    //Make jwt using the authentication object that spring security sends
    public String generateJwt(Authentication auth){
        //Time token issued
        Instant now = Instant.now();

        //Getting list of all authorities in string
        String scope = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));

        //Information that jwt will store
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .subject(auth.getName())
                .claim("roles",scope)
                .build();

        //passing back value of jwt token
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

}