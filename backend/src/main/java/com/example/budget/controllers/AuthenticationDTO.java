package com.example.budget.controllers;

import lombok.Data;

// перенести в отдельную папку
@Data
public class AuthenticationDTO {
    private String email;
    private String password;
}
