package com.example.budget.dao.transaction;

import com.example.budget.model.Transaction;

import java.util.List;

public interface TransactionDao {

    List<Transaction> selectTransactions();
    Transaction addTransaction(Transaction transaction);
    int deleteTransaction(int id);
}
