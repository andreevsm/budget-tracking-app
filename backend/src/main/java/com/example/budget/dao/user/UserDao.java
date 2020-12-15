package com.example.budget.dao.user;

import com.example.budget.model.User;

import java.util.List;
import java.util.Optional;

public interface UserDao {
    int insertUser(User user);

    default int addUser(User user) { return insertUser(user);
    }

    List<User> selectAllUsers();
    Optional<User> selectUserById(int id);

    int deleteUserById(int id);

    int updateUserById(int id, User user);
}
