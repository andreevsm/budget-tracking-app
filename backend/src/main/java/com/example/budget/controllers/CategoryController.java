package com.example.budget.controllers;

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
    public List<Category> getAllCategories(@RequestParam int accountId) {
        return categoryService.getAllCategories(accountId);
    }

    @PostMapping
    public Category addCategory(
            @RequestBody Category category
    ) {
        System.out.println(category);
        return categoryService.addCategory(category);
    }
}
