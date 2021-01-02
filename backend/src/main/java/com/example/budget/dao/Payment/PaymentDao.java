package com.example.budget.dao.Payment;

import com.example.budget.model.Payment;

import java.util.List;

public interface PaymentDao {
    List<Payment> selectPaymentsByAccountId(int accountId);

}
