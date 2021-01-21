package com.example.budget.services;

import com.example.budget.dao.category.CategoryDao;
import com.example.budget.model.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryDao categoryDao;

    @Autowired
    public CategoryService(
            @Qualifier("postgres_categories") CategoryDao categoryDao
    ) {
        this.categoryDao = categoryDao;
    }

    public List<Category> getAllCategories(int accountId) {
        return categoryDao.selectAllCategories(accountId);
    }

    public Category addCategory(Category category) {
        return categoryDao.addCategory(category);
    }
}
