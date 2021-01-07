package com.example.budget.rest;

import com.example.budget.model.Account;
import com.example.budget.model.Category;
import com.example.budget.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/categories")
@RestController
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(
            CategoryService categoryService
    ) {
        this.categoryService = categoryService;
    }

    @GetMapping()
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @PostMapping
    public int addCategory(
            @RequestBody Category category
    ) {
        return categoryService.addCategory(category);
    }
}
