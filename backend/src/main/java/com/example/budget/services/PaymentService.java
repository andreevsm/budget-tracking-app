package com.example.budget.services;

import com.example.budget.dao.Payment.PaymentDao;
import com.example.budget.model.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    private final PaymentDao paymentDao;

    @Autowired
    public PaymentService(
            @Qualifier("postgres_payments") PaymentDao paymentDao
    ) {
        this.paymentDao = paymentDao;
    }

    public List<Payment> getPaymentsByAccountId(int accountId) {
        return paymentDao.selectPaymentsByAccountId(accountId);
    }

    public int addPayment(Payment payment) {
        return paymentDao.addPayment(payment);
    }
}
