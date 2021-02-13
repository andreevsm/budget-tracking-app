package com.example.budget.dto;

import lombok.Data;

// перенести в отдельную папку
@Data
public class AuthenticationDTO {
    private String email;
    private String password;
}
