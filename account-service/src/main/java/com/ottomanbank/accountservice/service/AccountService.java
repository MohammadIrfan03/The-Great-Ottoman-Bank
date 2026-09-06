package com.ottomanbank.accountservice.service;

import com.ottomanbank.accountservice.dto.AccountResponse;
import com.ottomanbank.accountservice.dto.CreateAccountRequest;
import com.ottomanbank.accountservice.entity.Account;
import com.ottomanbank.accountservice.exception.AccountAlreadyExistsException;
import com.ottomanbank.accountservice.exception.AccountNotFoundException;
import com.ottomanbank.accountservice.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private static final SecureRandom RANDOM = new SecureRandom();

    public AccountResponse createAccount(String ownerEmail, String ownerName, CreateAccountRequest request) {
        if (accountRepository.existsByOwnerEmail(ownerEmail)) {
            throw new AccountAlreadyExistsException("An account already exists for: " + ownerEmail);
        }

        Account account = Account.builder()
                .accountNumber(generateAccountNumber())
                .ownerEmail(ownerEmail)
                .ownerName(ownerName)
                .accountType(request.getAccountType())
                .build();

        Account saved = accountRepository.save(account);
        return toResponse(saved);
    }

    public AccountResponse getMyAccount(String ownerEmail) {
        Account account = accountRepository.findByOwnerEmail(ownerEmail)
                .orElseThrow(() -> new AccountNotFoundException("No account found for: " + ownerEmail));
        return toResponse(account);
    }

    private String generateAccountNumber() {
        // Ottoman Bank format: OB + 10 random digits
        StringBuilder sb = new StringBuilder("OB");
        for (int i = 0; i < 10; i++) {
            sb.append(RANDOM.nextInt(10));
        }
        return sb.toString();
    }

    private AccountResponse toResponse(Account account) {
        return AccountResponse.builder()
                .id(account.getId())
                .accountNumber(account.getAccountNumber())
                .ownerEmail(account.getOwnerEmail())
                .ownerName(account.getOwnerName())
                .accountType(account.getAccountType())
                .balance(account.getBalance())
                .active(account.isActive())
                .createdAt(account.getCreatedAt())
                .build();
    }
}