package com.example.demo.model;

import jakarta.persistence.*;


@Entity
@Table(name="unit")
public class Unit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="unit_id")
    private int id;

    private boolean is_available;
    private int landlord_id;

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
