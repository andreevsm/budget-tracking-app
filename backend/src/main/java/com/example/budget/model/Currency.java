package com.example.budget.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "currencies")
public class Currency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "created_at")
    private Date createdAt;

    public Currency(
           int id,
           String name,
           Date createdAt
    ) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
    }
}
