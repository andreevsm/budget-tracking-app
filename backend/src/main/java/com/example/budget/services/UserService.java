package com.example.budget.services;

import com.example.budget.dao.user.UserDao;
import com.example.budget.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserDao userDao;

    @Autowired
    public UserService(@Qualifier("postgres") UserDao userDao) {
        this.userDao = userDao;
    }

    public int addUser(User user) {
        return userDao.addUser(user);
    }

    public List<User> getAllUsers() {
        return userDao.selectAllUsers();
    }

    public Optional<User> getUserById(int id) {
        return userDao.selectUserById(id);
    }

    public int deleteUser(int id) {
        return userDao.deleteUserById(id);
    }

    public int updateUser(int id, User user) {
        return userDao.updateUserById(id, user);
    }
}
