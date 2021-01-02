package com.example.budget.dao.account;

import com.example.budget.model.Account;
import org.hibernate.type.AnyType;

import java.util.List;
import java.util.Optional;

public interface AccountDao {
    int insertAccount(Account account);

    default int addAccount(Account account) {
        return insertAccount(account);
    }

    List<Account> selectAllAccounts(int userId);
    Optional<Account> selectAccountById(int id);

    int deleteAccountById(int id);
    int updateAccountById(int id, Account account);
}
