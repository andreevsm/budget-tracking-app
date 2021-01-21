package com.example.budget.model;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "color")
    private String color;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "account_id")
    private int accountId;

    public Category(
            int id,
            String name,
            String color,
            Timestamp createdAt,
            int accountId
    ) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.createdAt = createdAt;
        this.accountId = accountId;
    }

    public Category() {}
}
