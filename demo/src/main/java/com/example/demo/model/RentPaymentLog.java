package com.example.demo.model;


import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name="rent_payment_log")
public class RentPaymentLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="rpl_id")
    private int id;
    private int contract_id;
    private int amount_paid;
    private Date payment_date;
    private String payment_medium;
    private int check_number;
    private int online_transaction_number;

    public int getId() {
        return id;
    }

    public int getContract_id() {
        return contract_id;
    }

    public int getAmount_paid() {
        return amount_paid;
    }

    public Date getPayment_date() {
        return payment_date;
    }

    public String getPayment_medium() {
        return payment_medium;
    }

    public int getCheck_number() {
        return check_number;
    }

    public int getOnline_transaction_number() {
        return online_transaction_number;
    }
}
