package com.example.budget.dao.category;

import com.example.budget.model.Account;
import com.example.budget.model.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("postgres_categories")
public class CategoryDataAccessService implements CategoryDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public CategoryDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Category> selectAllCategories(int accountId) {
        final String sql = String.format("SELECT * from categories WHERE account_id = %d", accountId);

        return jdbcTemplate.query(sql, (result, i) -> {
            return new Category(
                    result.getInt("id"),
                    result.getString("name"),
                    result.getString("color"),
                    result.getDate("created_at"),
                    result.getInt("account_id")
            );
        });

    }

    @Override
    public int addCategory(Category category) {
        final String sql = "INSERT INTO categories (name, color, created_at) VALUES (?, ?, ?)";

        return jdbcTemplate.update(
                sql,
                category.getName(),
                category.getColor(),
                category.getCreatedAt()
        );
    }
}
