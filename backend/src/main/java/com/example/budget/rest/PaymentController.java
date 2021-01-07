package com.example.budget.rest;

import com.example.budget.model.Account;
import com.example.budget.model.Payment;
import com.example.budget.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/payments")
@RestController
public class PaymentController {

    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping()
    public List<Payment> getPaymentsByAccountId(@RequestParam int accountId) {
        return paymentService.getPaymentsByAccountId(accountId);
    }

    @PostMapping
    public int addPayment(@RequestBody PaymentDTO payment) {
        Payment newPayment = new Payment(
                payment.getAccountId(),
                payment.getCategoryId(),
                payment.getAmount(),
                payment.getCurrency(),
                payment.getOperationType(),
                payment.getCreatedAt()
        );

        return paymentService.addPayment(newPayment);
    }
}
