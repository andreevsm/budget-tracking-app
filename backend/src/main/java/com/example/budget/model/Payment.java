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

    @Column(name = "category_id")
    private int categoryId;

    @Column(name = "amount")
    private int amount;


    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "currency_id")
    private int currencyId;

    @Column(name = "type_of_operation")
    private String operationType;

    public Payment (
            int id,
            int accountId,
            int categoryId,
            int amount,
            int currencyId,
            String operationType,
            Date createdAt
    ) {
        this.id = id;
        this.accountId = accountId;
        this.categoryId = categoryId;
        this.amount = amount;
        this.currencyId = currencyId;
        this.operationType = operationType;
        this.createdAt = createdAt;
    }

    public Payment (
            int accountId,
            int categoryId,
            int amount,
            int currencyId,
            String operationType,
            Date createdAt
    ) {
        this.accountId = accountId;
        this.categoryId = categoryId;
        this.amount = amount;
        this.currencyId = currencyId;
        this.operationType = operationType;
        this.createdAt = createdAt;
    }

    public Payment() {

    }
}
