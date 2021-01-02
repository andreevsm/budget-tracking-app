package com.example.budget.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "account_id")
    private int accountId;

    @Column(name = "amount")
    private int amount;


    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "currency")
    private String currency;

    @Column(name = "type_of_operation")
    private String operationType;

    public Payment (int id, int accountId, int amount, String currency, String operationType, Date createdAt) {
        this.id = id;
        this.accountId = accountId;
        this.amount = amount;
        this.currency = currency;
        this.operationType = operationType;
        this.createdAt = createdAt;
    }

    public Payment() {

    }
}
