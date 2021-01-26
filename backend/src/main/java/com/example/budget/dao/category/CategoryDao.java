package com.example.budget.dao.category;

import com.example.budget.model.Category;

import java.util.List;

public interface CategoryDao {
    List<Category> selectAllCategories(int userId);
    Category addCategory(Category category, int userId);
}
