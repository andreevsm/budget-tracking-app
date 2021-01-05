package com.example.budget.rest;

import lombok.Data;

@Data
public class RegistrationDTO {
    private String login;
    private String email;
    private String password;
}
