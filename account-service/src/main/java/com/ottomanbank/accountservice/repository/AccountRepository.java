package com.ottomanbank.accountservice.repository;

import com.ottomanbank.accountservice.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByOwnerEmail(String ownerEmail);
    boolean existsByOwnerEmail(String ownerEmail);
    Optional<Account> findByAccountNumber(String accountNumber);
}