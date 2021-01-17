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

    public List<Transaction> getTransactions() {
        return transactionDao.selectTransactions();
    }

    public int addTransaction(Transaction transaction) {
        return transactionDao.addTransaction(transaction);
    }
    public int deleteTransaction(int id) {
        return transactionDao.deleteTransaction(id);
    }
}
