package com.example.budget.rest;

import com.example.budget.model.Account;
import com.example.budget.security.JwtTokenProvider;
import com.example.budget.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/api/v1/accounts")
@RestController
public class AccountController {

    private final AccountService accountService;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AccountController(AccountService accountService, JwtTokenProvider jwtTokenProvider) {
        this.accountService = accountService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping()
    public List<Account> getAllAccounts(@RequestHeader(value = "Authorization") String authorizationToken) {
        String id = jwtTokenProvider.getUserId(authorizationToken);
        return accountService.getAllAccounts(Integer.parseInt(id));
    }

    @PostMapping
    public int addAccount(
            @RequestHeader(value = "Authorization") String authorizationToken,
            @RequestBody Account account
    ) {
        String id = jwtTokenProvider.getUserId(authorizationToken);
        return accountService.addAccount(Integer.parseInt(id), account);
    }

    @GetMapping("/{id}")
    public Optional<Account> getById(@PathVariable int id) {
        return accountService.getAccountById(id);
    }

}
