package com.ottomanbank.transactionservice.repository;

import com.ottomanbank.transactionservice.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByFromAccountOrToAccountOrderByCreatedAtDesc(String fromAccount, String toAccount);
}