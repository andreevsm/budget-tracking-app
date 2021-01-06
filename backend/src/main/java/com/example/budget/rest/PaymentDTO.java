package com.example.budget.rest;

import lombok.Data;

import java.util.Date;

@Data
public class PaymentDTO {
    private int accountId;
    private int amount;
    private int categoryId;
    private Date createdAt;
    private String currency;
    private String operationType;
}
