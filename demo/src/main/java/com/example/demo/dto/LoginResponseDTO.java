package com.example.demo.dto;

import com.example.demo.model.SecureUser;

public class LoginResponseDTO {
    private SecureUser user;
    private String jwt;

    public LoginResponseDTO(){
        super();
    }

    public LoginResponseDTO(SecureUser user, String jwt){
        this.user = user;
        this.jwt = jwt;
    }

    public SecureUser getUser(){
        return this.user;
    }

    public void setUser(SecureUser user){
        this.user = user;
    }

    public String getJwt(){
        return this.jwt;
    }

    public void setJwt(String jwt){
        this.jwt = jwt;
    }

}