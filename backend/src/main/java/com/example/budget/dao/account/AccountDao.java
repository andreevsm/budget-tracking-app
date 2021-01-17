package com.example.budget.dao.account;

import com.example.budget.model.Account;

import java.util.List;
import java.util.Optional;

public interface AccountDao {
    int insertAccount(Account account);

    int addAccount(int userId, Account account);

    List<Account> selectAllAccounts(int userId);
    Optional<Account> selectAccountById(int id);

    int deleteAccount(int id);
}
