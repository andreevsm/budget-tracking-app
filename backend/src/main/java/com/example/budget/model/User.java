package com.example.budget.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class User {
    private final int id;
    private final String login;
    private final String email;
    private final String passwordHash;

    public User(
            @JsonProperty("id") int id,
            @JsonProperty("login") String login,
            @JsonProperty("email") String email,
            @JsonProperty("passwordHash") String passwordHash
    ) {
        this.id = id;
        this.email = email;
        this.login = login;
        this.passwordHash = passwordHash;
    }

    public int getId() {
        return id;
    }

    public String getLogin() {
        return login;
    }

    public String getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }
}
