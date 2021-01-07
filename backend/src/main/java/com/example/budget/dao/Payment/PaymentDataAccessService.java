package com.example.budget.dao.Payment;

import com.example.budget.model.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("postgres_payments")
public class PaymentDataAccessService implements  PaymentDao {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PaymentDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public List<Payment> selectPaymentsByAccountId(int accountId) {
        final String sql = String.format("SELECT * from payments WHERE account_id = %d", accountId);

        return jdbcTemplate.query(sql, (result, i) -> {
            return new Payment(
                    result.getInt("id"),
                    result.getInt("account_id"),
                    result.getInt("category_id"),
                    result.getInt("amount"),
                    result.getInt("currency_id"),
                    result.getString("type_of_operation"),
                    result.getDate("created_at")
            );
        });
    }

    @Override
    public int addPayment(Payment payment) {
        final String sql = "INSERT INTO payments (account_id, amount, type_of_operation, category_id, created_at, currency_id) VALUES (?, ?, ?::type_of_operation, ?, ?, ?::currency)";

        return jdbcTemplate.update(
                sql,
                payment.getAccountId(),
                payment.getAmount(),
                payment.getOperationType(),
                payment.getCategoryId(),
                payment.getCreatedAt(),
                payment.getCurrencyId()
        );
    }
}
