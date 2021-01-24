package com.example.budget.dao.account;

import com.example.budget.model.Account;
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
import java.util.Optional;

@Repository("postgres_accounts")
public class AccountDataAccessService implements AccountDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public AccountDataAccessService (JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int updateAccount(Account account) {
        final String sql = "UPDATE accounts " +
                "SET name = ?," +
                "description = ?," +
                "amount = ?," +
                "currency_id = ?" +
                "WHERE id = ?";

        return jdbcTemplate.update(
                sql,
                account.getName(),
                account.getDescription(),
                account.getAmount(),
                account.getCurrencyId(),
                account.getId()
        );
    }

    @Override
    public Account addAccount(int userId, Account account) {
        final String sql = "INSERT INTO accounts (" +
                "user_id," +
                "name," +
                "description," +
                "created_at," +
                "amount," +
                "currency_id" +
                ") VALUES (?, ?, ?, ?, ?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();


        int result = jdbcTemplate.update(
                new PreparedStatementCreator() {
                    @Override
                    public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                        PreparedStatement preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);

                        preparedStatement.setInt(1, userId);
                        preparedStatement.setString(2, account.getName());
                        preparedStatement.setString(3, account.getDescription());
                        preparedStatement.setTimestamp(4, account.getCreatedAt());
                        preparedStatement.setLong(5, account.getAmount());
                        preparedStatement.setInt(6, account.getCurrencyId());

                        return preparedStatement;
                    }
                }, keyHolder);

        if (result > 0) {
            Map<String, Object> keys = keyHolder.getKeys();

            return new Account(
                    (int) keys.get("id"),
                    (int) keys.get("user_id"),
                    (String) keys.get("name"),
                    (String) keys.get("description"),
                    (int) keys.get("currency_id"),
                    (Timestamp) keys.get("created_at"),
                    (long) keys.get("amount")
            );
        }

        return null;
    }

    @Override
    public List<Account> selectAllAccounts(int userId) {
        final String sql = String.format("SELECT * from accounts WHERE user_id = %d", userId) ;

        return jdbcTemplate.query(sql, (result, i) -> {
            return new Account(
                    result.getInt("id"),
                    result.getInt("user_id"),
                    result.getString("name"),
                    result.getString("description"),
                    result.getInt("currency_id"),
                    result.getTimestamp("created_at"),
                    new Long(Integer.valueOf(result.getInt("amount")).toString())
            );
        });
    }

    @Override
    public Optional<Account> selectAccountById(int id) {
        final String sql = "SELECT * FROM accounts WHERE id= ?";

        Account account = jdbcTemplate.queryForObject(
                sql,
                new Object[]{id},
                (result, i) -> {
                    return new Account(
                            result.getInt("id"),
                            result.getInt("user_id"),
                            result.getString("name"),
                            result.getString("description"),
                            result.getInt("currency_id"),
                            result.getTimestamp("created_at"),
                            result.getLong("amount")
                    );
                }
        );

        return Optional.ofNullable(account);
    }

    @Override
    public int deleteAccount(int id) {
        final String sql = "DELETE FROM accounts WHERE id = ?";

        int result = jdbcTemplate.update(sql, id);

        if (result > 0) {
            return id;
        }

        return 0;
    }
}
