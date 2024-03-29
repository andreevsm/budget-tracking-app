package com.example.budget.dao.transaction;

import com.example.budget.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.*;
import java.util.List;
import java.util.Map;

@Repository("postgres_transactions")
public class TransactionDataAccessService implements TransactionDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public TransactionDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Transaction> selectTransactions(int userId) {
        final String sql = String.format("SELECT * FROM transactions WHERE user_id = %d ORDER by id desc", userId);

        return jdbcTemplate.query(sql, (result, i) -> {
            return new Transaction(
                    result.getInt("id"),
                    result.getInt("account_income"),
                    result.getInt("account_outcome"),
                    result.getBigDecimal("income"),
                    result.getBigDecimal("outcome"),
                    result.getString("comment"),
                    result.getTimestamp("created_at"),
                    result.getInt("category_id"),
                    result.getInt("user_id")
            );
        });
    }

    @Override
    public Transaction addTransaction(Transaction transaction, int userId) {
        KeyHolder keyHolder = new GeneratedKeyHolder();

        if (transaction.getCategoryId() == 0) {
            final String sql = "INSERT INTO transactions (" +
                    "account_income," +
                    "account_outcome," +
                    "income," +
                    "outcome," +
                    "comment," +
                    "created_at," +
                    "user_id" +
                    ") VALUES (?, ?, ?, ?, ?, ?, ?)";


            int result = jdbcTemplate.update(new PreparedStatementCreator() {
                @Override
                public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                    PreparedStatement preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
                    preparedStatement.setInt(1, transaction.getAccountIncome());
                    preparedStatement.setInt(2, transaction.getAccountOutcome());
                    preparedStatement.setBigDecimal(3, transaction.getIncome());
                    preparedStatement.setBigDecimal(4, transaction.getOutcome());
                    preparedStatement.setString(5, transaction.getComment());
                    preparedStatement.setTimestamp(6, transaction.getCreatedAt());
                    preparedStatement.setInt(7, userId);

                    return preparedStatement;
                }
            }, keyHolder);

            if (result > 0) {

                Map<String, Object> keys = keyHolder.getKeys();

                int categoryId = keys.get("category_id") != null ? (int) keys.get("category_id") : 0;

                return Transaction.builder()
                        .id((int) keys.get("id"))
                        .accountIncome((int) keys.get("account_income"))
                        .accountOutcome((int) keys.get("account_outcome"))
                        .income((BigDecimal) keys.get("income"))
                        .outcome((BigDecimal) keys.get("outcome"))
                        .comment((String) keys.get("comment"))
                        .createdAt((Timestamp) keys.get("created_at"))
                        .categoryId(categoryId)
                        .userId((int) keys.get("user_id"))
                        .build();
            }
        } else {
            final String sql = "INSERT INTO transactions (" +
                    "account_income," +
                    "account_outcome," +
                    "income," +
                    "outcome," +
                    "comment," +
                    "created_at," +
                    "category_id," +
                    "user_id" +
                    ") VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

            int result = jdbcTemplate.update(new PreparedStatementCreator() {
                @Override
                public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                    PreparedStatement preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
                    preparedStatement.setInt(1, transaction.getAccountIncome());
                    preparedStatement.setInt(2, transaction.getAccountOutcome());
                    preparedStatement.setBigDecimal(3, transaction.getIncome());
                    preparedStatement.setBigDecimal(4, transaction.getOutcome());
                    preparedStatement.setString(5, transaction.getComment());
                    preparedStatement.setTimestamp(6, transaction.getCreatedAt());
                    preparedStatement.setInt(7, transaction.getCategoryId());
                    preparedStatement.setInt(8, userId);

                    return preparedStatement;
                }
            }, keyHolder);

            if (result > 0) {

                Map<String, Object> keys = keyHolder.getKeys();

                return Transaction.builder()
                        .id((int) keys.get("id"))
                        .accountIncome((int) keys.get("account_income"))
                        .accountOutcome((int) keys.get("account_outcome"))
                        .income((BigDecimal) keys.get("income"))
                        .outcome((BigDecimal) keys.get("outcome"))
                        .comment((String) keys.get("comment"))
                        .createdAt((Timestamp) keys.get("created_at"))
                        .categoryId((int) keys.get("category_id"))
                        .userId((int) keys.get("user_id"))
                        .build();
            }
        }


        return null;
    }

    @Override
    public int deleteTransaction(int id, int userId) {
        final String sql = String.format("DELETE FROM transactions WHERE id = %d AND user_id = %d", id, userId);

        int result = jdbcTemplate.update(sql);

        if (result > 0) {
            return id;
        }

        return 0;
    }
}
