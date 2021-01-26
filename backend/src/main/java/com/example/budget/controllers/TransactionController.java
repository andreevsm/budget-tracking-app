package com.example.budget.controllers;

import com.example.budget.model.Transaction;
import com.example.budget.security.JwtTokenProvider;
import com.example.budget.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/transactions")
@RestController
public class TransactionController {
    private final TransactionService transactionService;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public TransactionController(TransactionService transactionService, JwtTokenProvider jwtTokenProvider) {
        this.transactionService = transactionService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping
    public List<Transaction> getTransactions(@RequestHeader(value = "Authorization") String authorizationToken) {
        String id = jwtTokenProvider.getUserId(authorizationToken);

        return transactionService.getTransactions(Integer.parseInt(id));
    }

    @PostMapping
    public Transaction addTransaction(
            @RequestBody Transaction transaction,
            @RequestHeader(value = "Authorization") String authorizationToken
    ) {

        String id = jwtTokenProvider.getUserId(authorizationToken);

        Transaction newTransaction = new Transaction(
                transaction.getAccountIncome(),
                transaction.getAccountOutcome(),
                transaction.getIncome(),
                transaction.getOutcome(),
                transaction.getComment(),
                transaction.getCreatedAt(),
                transaction.getCategoryId(),
                Integer.parseInt(id)
        );

        return transactionService.addTransaction(newTransaction, Integer.parseInt(id));
    }

    @DeleteMapping("{id}")
    public int deleteTransaction(
            @PathVariable("id") int id,
            @RequestHeader(value = "Authorization") String authorizationToken
    ) {
        String userId = jwtTokenProvider.getUserId(authorizationToken);

        return transactionService.deleteTransaction(id, Integer.parseInt(userId));
    }
}
