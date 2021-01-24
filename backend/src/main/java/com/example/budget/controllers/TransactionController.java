package com.example.budget.controllers;

import com.example.budget.model.Transaction;
import com.example.budget.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/transactions")
@RestController
public class TransactionController {
    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public List<Transaction> getTransactions() {
        return transactionService.getTransactions();
    }

    @PostMapping
    public Transaction addTransaction(
            @RequestBody Transaction transaction
    ) {
        Transaction newTransaction = new Transaction(
                transaction.getAccountIncome(),
                transaction.getAccountOutcome(),
                transaction.getIncome(),
                transaction.getOutcome(),
                transaction.getComment(),
                transaction.getCreatedAt(),
                transaction.getCategoryId()
        );

        return transactionService.addTransaction(newTransaction);
    }

    @DeleteMapping("{id}")
    public int deleteTransaction(@PathVariable("id") int id) {
        return transactionService.deleteTransaction(id);
    }
}
