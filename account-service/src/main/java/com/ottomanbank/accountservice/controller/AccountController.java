package com.ottomanbank.accountservice.controller;

import com.ottomanbank.accountservice.dto.AccountResponse;
import com.ottomanbank.accountservice.dto.CreateAccountRequest;
import com.ottomanbank.accountservice.service.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @PostMapping
    public ResponseEntity<AccountResponse> createAccount(
            @Valid @RequestBody CreateAccountRequest request,
            Authentication authentication) {

        String email = authentication.getName();
        // ownerName isn't in the JWT by default; using email prefix as a
        // simple placeholder until a user-profile lookup is wired in.
        String ownerName = email.split("@")[0];

        AccountResponse response = accountService.createAccount(email, ownerName, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/me")
    public ResponseEntity<AccountResponse> getMyAccount(Authentication authentication) {
        String email = authentication.getName();
        AccountResponse response = accountService.getMyAccount(email);
        return ResponseEntity.ok(response);
    }
}