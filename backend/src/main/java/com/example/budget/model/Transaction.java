package com.example.budget.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "account_income")
    private int accountIncome;

    @Column(name = "account_outcome")
    private int accountOutcome;

    @Column(name = "income")
    private int income;

    @Column(name = "outcome")
    private int outcome;

    @Column(name = "comment")
    private String comment;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "category_id")
    private int categoryId;

    public Transaction (
            int id,
            int accountIncome,
            int accountOutcome,
            int income,
            int outcome,
            String comment,
            Date createdAt,
            int categoryId
    ) {
        this.id = id;
        this.accountIncome = accountIncome;
        this.accountOutcome = accountOutcome;
        this.income = income;
        this.outcome = outcome;
        this.comment = comment;
        this.createdAt = createdAt;
        this.categoryId = categoryId;
    }

    public Transaction (
            int accountIncome,
            int accountOutcome,
            int income,
            int outcome,
            String comment,
            Date createdAt,
            int categoryId
    ) {
        this.accountIncome = accountIncome;
        this.accountOutcome = accountOutcome;
        this.income = income;
        this.outcome = outcome;
        this.comment = comment;
        this.createdAt = createdAt;
        this.categoryId = categoryId;
    }

    public Transaction() {}
}
