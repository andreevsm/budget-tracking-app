package com.example.budget.model;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;

// Сделать как в аакаунте
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

    @Column(name = "user_id")
    private int userId;

    public Category(
            int id,
            String name,
            String color,
            Timestamp createdAt,
            int userId
    ) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.createdAt = createdAt;
        this.userId = userId;
    }

    public Category() {}
}
