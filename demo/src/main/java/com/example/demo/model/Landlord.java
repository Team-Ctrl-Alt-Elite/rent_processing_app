package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;


@Entity
@Table(name="landlord")
public class Landlord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="landlord_id")
    private int id;
    private String first_name;
    private String last_name;
    private String username;
    @JsonIgnore
    private String pass;
    @JsonIgnore
    private String account_number;
    @JsonIgnore
    private String routing_number;
    private String phone_number;

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public void setAccount_number(String account_number) {
        this.account_number = account_number;
    }

    public void setRouting_number(String routing_number) {
        this.routing_number = routing_number;
    }


    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public String getLast_name() {
        return last_name;
    }

    public String getUsername() {
        return username;
    }

    public String getAccount_number() {
        return account_number;
    }

    public String getRouting_number() {
        return routing_number;
    }

    public String getPhone_number() {
        return phone_number;
    }

}
