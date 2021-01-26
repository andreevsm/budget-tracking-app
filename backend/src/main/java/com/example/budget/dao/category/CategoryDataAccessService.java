package com.example.budget.dao.category;

import com.example.budget.model.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@Repository("postgres_categories")
public class CategoryDataAccessService implements CategoryDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public CategoryDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Category> selectAllCategories(int userId) {
        final String sql = String.format("SELECT * from categories WHERE user_id = %d", userId);

        return jdbcTemplate.query(sql, (result, i) -> {
            return new Category(
                    result.getInt("id"),
                    result.getString("name"),
                    result.getString("color"),
                    result.getTimestamp("created_at"),
                    result.getInt("user_id")
            );
        });

    }

    @Override
    public Category addCategory(Category category, int userId) {
        final String sql = "INSERT INTO categories (" +
                "name," +
                "color," +
                "created_at," +
                "user_id" +
                ") VALUES (?, ?, ?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        int result = jdbcTemplate.update(
                new PreparedStatementCreator() {
                    @Override
                    public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                        PreparedStatement preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);

                        preparedStatement.setString(1, category.getName());
                        preparedStatement.setString(2, category.getColor());
                        preparedStatement.setTimestamp(3, category.getCreatedAt());
                        preparedStatement.setInt(4, userId);

                        return preparedStatement;
                    }
                }, keyHolder);

        if (result > 0) {
            Map<String, Object> keys = keyHolder.getKeys();

            return new Category(
                    (int) keys.get("id"),
                    (String) keys.get("name"),
                    (String) keys.get("color"),
                    (Timestamp) keys.get("created_at"),
                    (int) keys.get("user_id")
            );
        }

        return null;
    }
}
