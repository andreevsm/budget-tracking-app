package com.example.budget.controllers;

import lombok.Data;

// перенести в отдельную папку
@Data
public class RegistrationDTO {
    private String login;
    private String email;
    private String password;
}
