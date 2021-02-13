package com.example.budget.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int accountIncome;
    private int accountOutcome;
    private BigDecimal income;
    private BigDecimal outcome;
    private String comment;
    private Timestamp createdAt;
    private int categoryId;
    private int userId;
}
