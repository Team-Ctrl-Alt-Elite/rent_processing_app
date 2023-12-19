package com.example.demo.model;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name="contract")
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="contract_id")
    private int id;

    private int unit_id;

    private int monthly_rent;

    private Date lease_starting_from;

    private Date lease_ending_on;

    private int tenant_id;
    private int landlord_id;

    public int getLandlord_id() {
        return landlord_id;
    }

    public void setLandlord_id(int landlord_id) {
        this.landlord_id = landlord_id;
    }

    public int getId() {
        return id;
    }

    public int getUnit_id() {
        return unit_id;
    }

    public void setUnit_id(int unit_id) {
        this.unit_id = unit_id;
    }

    public int getMonthly_rent() {
        return monthly_rent;
    }

    public void setMonthly_rent(int monthly_rent) {
        this.monthly_rent = monthly_rent;
    }

    public Date getLease_starting_from() {
        return lease_starting_from;
    }

    public void setLease_starting_from(Date lease_starting_from) {
        this.lease_starting_from = lease_starting_from;
    }

    public Date getLease_ending_on() {
        return lease_ending_on;
    }

    public void setLease_ending_on(Date lease_ending_on) {
        this.lease_ending_on = lease_ending_on;
    }

    public int getTenant_id() {
        return tenant_id;
    }

    public void setTenant_id(int tenant_id) {
        this.tenant_id = tenant_id;
    }
}
