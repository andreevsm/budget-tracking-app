package com.example.budget.rest;

import com.example.budget.model.Account;
import com.example.budget.security.JwtTokenProvider;
import com.example.budget.services.AccountService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/v1/accounts")
@RestController
public class AccountController {

    private final AccountService accountService;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AccountController(AccountService accountService, JwtTokenProvider jwtTokenProvider) {
        this.accountService = accountService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping
    public List<Account> getAllAccounts(@RequestHeader(value = "Authorization") String authorizationToken) {
        Authentication authentication = jwtTokenProvider.getAuthentication(authorizationToken);
        String id = jwtTokenProvider.getUserId(authorizationToken);

        System.out.println("id: " + id);
        System.out.println("authentication: " + authentication);

        return accountService.getAllAccounts(Integer.parseInt(id));
    }
}
