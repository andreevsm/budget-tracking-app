package com.example.budget.model;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

// Сделать как в аакаунте

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
    private BigDecimal income;

    @Column(name = "outcome")
    private BigDecimal outcome;

    @Column(name = "comment")
    private String comment;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "category_id")
    private int categoryId;

    @Column(name = "user_id")
    private int userId;

    public Transaction (
            int id,
            int accountIncome,
            int accountOutcome,
            BigDecimal income,
            BigDecimal outcome,
            String comment,
            Timestamp createdAt,
            int categoryId,
            int userId
    ) {
        this.id = id;
        this.accountIncome = accountIncome;
        this.accountOutcome = accountOutcome;
        this.income = income;
        this.outcome = outcome;
        this.comment = comment;
        this.createdAt = createdAt;
        this.categoryId = categoryId;
        this.userId = userId;
    }

    public Transaction (
            int accountIncome,
            int accountOutcome,
            BigDecimal income,
            BigDecimal outcome,
            String comment,
            Timestamp createdAt,
            int categoryId,
            int userId
    ) {
        this.accountIncome = accountIncome;
        this.accountOutcome = accountOutcome;
        this.income = income;
        this.outcome = outcome;
        this.comment = comment;
        this.createdAt = createdAt;
        this.categoryId = categoryId;
        this.userId = userId;
    }

    public Transaction() {}
}
