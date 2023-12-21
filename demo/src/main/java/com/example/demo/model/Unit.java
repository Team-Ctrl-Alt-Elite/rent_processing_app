package com.example.demo.model;

import jakarta.persistence.*;


@Entity
@Table(name="unit")
public class Unit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="unit_id")
    private int id;

    public String getBuilding_address() {
        return building_address;
    }

    public void setBuilding_address(String building_address) {
        this.building_address = building_address;
    }

    public void setLandlord_id(int landlord_id) {
        this.landlord_id = landlord_id;
    }

    private String building_address;
    private boolean is_available;
    private int landlord_id;
    private int rent;

    public void setId(int id) {
        this.id = id;
    }

    public int getRent() {
        return rent;
    }

    public void setRent(int rent) {
        this.rent = rent;
    }

    public int getBed() {
        return bed;
    }

    public void setBed(int bed) {
        this.bed = bed;
    }

    public int getBath() {
        return bath;
    }

    public void setBath(int bath) {
        this.bath = bath;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    private int bed;
    private int bath;
    private int size;
    public boolean isIs_available() {
        return is_available;
    }

    public int getId() {
        return id;
    }

    public int getLandlord_id() {
        return landlord_id;
    }

    public void setIs_available(boolean is_available) {
        this.is_available = is_available;
    }
}
