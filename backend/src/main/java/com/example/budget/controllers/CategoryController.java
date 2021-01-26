package com.example.budget.controllers;

import com.example.budget.model.Category;
import com.example.budget.security.JwtTokenProvider;
import com.example.budget.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/categories")
@RestController
public class CategoryController {

    private final CategoryService categoryService;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public CategoryController(
            CategoryService categoryService,
            JwtTokenProvider jwtTokenProvider
    ) {
        this.categoryService = categoryService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping()
    public List<Category> getAllCategories(
            @RequestHeader(value = "Authorization") String authorizationToken
    ) {
        String id = jwtTokenProvider.getUserId(authorizationToken);
        return categoryService.getAllCategories(Integer.parseInt(id));
    }

    @PostMapping
    public Category addCategory(
            @RequestBody Category category,
            @RequestHeader(value = "Authorization") String authorizationToken
    ) {
        String id = jwtTokenProvider.getUserId(authorizationToken);
        return categoryService.addCategory(category, Integer.parseInt(id));
    }
}
