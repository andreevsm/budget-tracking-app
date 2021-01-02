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
                    result.getInt("amount"),
                    result.getString("currency"),
                    result.getString("type_of_operation"),
                    result.getDate("created_at")
            );
        });
    }
}
