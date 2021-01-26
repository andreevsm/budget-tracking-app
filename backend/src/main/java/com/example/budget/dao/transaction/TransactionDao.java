package com.example.budget.dao.transaction;

import com.example.budget.model.Transaction;

import java.util.List;

public interface TransactionDao {

    List<Transaction> selectTransactions(int userId);
    Transaction addTransaction(Transaction transaction, int userId);
    int deleteTransaction(int id, int userId);
}
