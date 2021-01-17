package com.example.budget.dao.account;

import com.example.budget.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Repository("postgres_accounts")
public class AccountDataAccessService implements AccountDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public AccountDataAccessService (JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int insertAccount(Account account) {
        return 0;
    }

    @Override
    public int addAccount(int userId, Account account) {
        final String sql = "INSERT INTO accounts (user_id, name, description, created_at, amount, currency_id) VALUES (?, ?, ?, ?, ?, ?)";

        return jdbcTemplate.update(
                sql,
                userId,
                account.getName(),
                account.getDescription(),
                account.getCreatedAt(),
                account.getAmount(),
                account.getCurrencyId()
        );
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
                    result.getDate("created_at"),
                    new BigInteger(Integer.valueOf(result.getInt("amount")).toString())
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
                            result.getDate("created_at"),
                            new BigInteger(Integer.valueOf(result.getInt("amount")).toString())
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
