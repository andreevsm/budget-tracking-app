package com.example.budget.dao.user;

import com.example.budget.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository("postgres")
public class UserDataAccessService implements UserDao {
    private static List<User> DB = new ArrayList<>();

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserDataAccessService (JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int insertUser(User user) {
        return 0;
    }

    @Override
    public List<User> selectAllUsers() {
        final String sql = "SELECT * from users";

        return jdbcTemplate.query(sql, (result, i) -> {
            return new User(
                    result.getInt("id"),
                    result.getString("email"),
                    result.getString("login"),
                    result.getString("passwordHash")
            );
        });
    }

    @Override
    public Optional<User> selectUserById(int id) {
        final String sql = "SELECT * FROM person WHERE id= ?";

        User person = jdbcTemplate.queryForObject(
                sql,
                new Object[]{id},
                (result, i) -> {
                    int userId = result.getInt("id");
                    String login = result.getString("login");
                    String email = result.getString("email");
                    String passwordHash = result.getString("passwordHash");
                    return new User(userId, login, email, passwordHash);
                }
        );

        return Optional.ofNullable(person);
    }

    @Override
    public int deleteUserById(int id) {
        Optional<User> personOptional = selectUserById(id);
        if (personOptional.isEmpty()) {
            return 0;
        }

        DB.remove(personOptional.get());
        return 1;
    }

    @Override
    public int updateUserById(int id, User user) {
        return selectUserById(id).map(_person -> {
            int updatedPersonIndex = DB.indexOf(_person);

            if (updatedPersonIndex >= 0) {
                DB.set(updatedPersonIndex, new User(id, user.getLogin(), user.getEmail(), user.getPasswordHash()));
                return 1;
            }

            return 0;
        }).orElse(0);
    }
}
