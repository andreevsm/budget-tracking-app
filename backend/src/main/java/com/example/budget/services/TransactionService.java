package com.example.budget.services;

import com.example.budget.dao.transaction.TransactionDao;
import com.example.budget.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {
    private final TransactionDao transactionDao;

    @Autowired
    public TransactionService(
            @Qualifier("postgres_transactions") TransactionDao transactionDao
    ) {
        this.transactionDao = transactionDao;
    }

    public List<Transaction> getTransactions(int userId) {
        return transactionDao.selectTransactions(userId);
    }

    public Transaction addTransaction(Transaction transaction, int userId) {
        return transactionDao.addTransaction(transaction, userId);
    }
    public int deleteTransaction(int id, int userId) {
        return transactionDao.deleteTransaction(id, userId);
    }
}
