package com.example.budget.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "accounts")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name ="name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "currency")
    private String currency;

    public Account (int id, int userId, String name, String description, String currency, Date createdAt) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.description = description;
        this.currency = currency;
        this.createdAt = createdAt;
    }

    public Account() {

    }

    public int getId() {
        return id;
    }

    public int getUserId() {
        return userId;
    }

    public String getCurrency() {
        return currency;
    }

    public String getDescription() {
        return description;
    }

    public String getName() {
        return name;
    }

    public Date getCreatedAt() {
        return createdAt;
    }
}
