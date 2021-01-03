package com.example.budget.services;

import com.example.budget.dao.account.AccountDao;
import com.example.budget.model.Account;
import org.hibernate.type.AnyType;
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

    public Optional<Account> getAccountById(int id) {
        return accountDao.selectAccountById(id);
    }
}
