package com.example.budget.dao.account;

import com.example.budget.model.Account;
import com.example.budget.security.JwtTokenProvider;
import org.hibernate.type.AnyType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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
    public List<Account> selectAllAccounts(int userId) {
        final String sql = String.format("SELECT * from accounts WHERE user_id = %d", userId) ;

        return jdbcTemplate.query(sql, (result, i) -> {
            return new Account(
                    result.getInt("id"),
                    result.getInt("user_id"),
                    result.getString("name"),
                    result.getString("description"),
                    result.getString("currency"),
                    result.getDate("created_at")
            );
        });
    }

    @Override
    public Optional<Account> selectAccountById(int id) {
        final String sql = "SELECT * FROM accounts WHERE id= ?";


        System.out.println("id: " + id);
        System.out.println("sql: " + sql);


        Account account = jdbcTemplate.queryForObject(
                sql,
                new Object[]{id},
                (result, i) -> {
                    return new Account(
                            result.getInt("id"),
                            result.getInt("user_id"),
                            result.getString("name"),
                            result.getString("description"),
                            result.getString("currency"),
                            result.getDate("created_at")
                    );
                }
        );

        return Optional.ofNullable(account);
    }

    @Override
    public int deleteAccountById(int id) {
        return 0;
    }

    @Override
    public int updateAccountById(int id, Account account) {
        return 0;
    }
}
