package com.example.budget.api;

import com.example.budget.model.Account;
import com.example.budget.services.AccountService;
import org.hibernate.type.AnyType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("api/v1/accounts")
@RestController
public class AccountController {

    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public AnyType getAllAccounts() {
        return accountService.getAllAccounts();
    }
}
