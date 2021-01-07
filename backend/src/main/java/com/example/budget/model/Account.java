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

    @Column(name = "currency_id")
    private int currencyId;

    public Account (int id, int userId, String name, String description, int currencyId, Date createdAt) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.description = description;
        this.currencyId = currencyId;
        this.createdAt = createdAt;
    }

    public Account() {

    }
}
