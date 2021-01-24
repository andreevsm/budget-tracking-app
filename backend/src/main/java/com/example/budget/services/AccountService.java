package com.example.budget.services;

import com.example.budget.dao.account.AccountDao;
import com.example.budget.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {
    private final AccountDao accountDao;

    @Autowired
    public AccountService(@Qualifier("postgres_accounts") AccountDao accountDao) {
        this.accountDao = accountDao;
    }

    public List<Account> getAllAccounts(int userId) {
        return accountDao.selectAllAccounts(userId);
    }

    public Account addAccount(int userId, Account account) {
        return accountDao.addAccount(userId, account);
    }

    public Optional<Account> getAccountById(int id) {
        return accountDao.selectAccountById(id);
    }

    public int deleteAccount(int id) {
        return accountDao.deleteAccount(id);
    }

    public int updateAccount(Account account) {
        return accountDao.updateAccount(account);
    }
}
