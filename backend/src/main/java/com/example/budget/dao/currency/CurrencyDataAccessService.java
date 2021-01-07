package com.example.budget.dao.currency;

import com.example.budget.model.Currency;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("postgres_currencies")
public class CurrencyDataAccessService implements CurrencyDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public CurrencyDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Currency> selectAllCurrencies() {
        final String sql = "SELECT * from currencies";

        return jdbcTemplate.query(sql, (result, i) -> {
            return new Currency(
                    result.getInt("id"),
                    result.getString("name"),
                    result.getDate("created_at")
            );
        });
    }
}
