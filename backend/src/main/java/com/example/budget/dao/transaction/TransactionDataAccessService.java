package com.example.budget.dao.transaction;

import com.example.budget.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("postgres_transactions")
public class TransactionDataAccessService implements TransactionDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public TransactionDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }



    @Override
    public List<Transaction> selectTransactions() {
        final String sql = "SELECT * FROM transactions";

        return jdbcTemplate.query(sql, (result, i) -> {
            return new Transaction(
                    result.getInt("id"),
                    result.getInt("account_income"),
                    result.getInt("account_outcome"),
                    result.getInt("income"),
                    result.getInt("outcome"),
                    result.getString("comment"),
                    result.getDate("created_at"),
                    result.getInt("category_id")
            );
        });
    }

    @Override
    public int addTransaction(Transaction transaction) {
        final String sql = "INSERT INTO transactions (" +
                "account_income," +
                "account_outcome," +
                "income," +
                "outcome," +
                "comment," +
                "created_at" +
                "category_id" +
                ") VALUES (?, ?, ?, ?, ?, ?, ?)";

        return jdbcTemplate.update(
                sql,
                transaction.getAccountIncome(),
                transaction.getAccountOutcome(),
                transaction.getIncome(),
                transaction.getOutcome(),
                transaction.getComment(),
                transaction.getCreatedAt(),
                transaction.getCategoryId()
        );
    }

    @Override
    public int deleteTransaction(int id) {
        final String sql = "DELETE FROM transactions WHERE id = ?";

        return jdbcTemplate.update(sql, id);
    }
}
