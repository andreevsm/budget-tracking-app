package com.example.budget.repository;

import com.example.budget.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// подумать либо DAO либо repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
