package com.ottomanbank.transactionservice.service;

import com.ottomanbank.transactionservice.client.AccountServiceClient;
import com.ottomanbank.transactionservice.dto.*;
import com.ottomanbank.transactionservice.entity.Transaction;
import com.ottomanbank.transactionservice.entity.TransactionStatus;
import com.ottomanbank.transactionservice.entity.TransactionType;
import com.ottomanbank.transactionservice.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountServiceClient accountServiceClient;
    private final TransactionEventPublisher eventPublisher;
    private static final SecureRandom RANDOM = new SecureRandom();

    public TransactionResponse deposit(DepositRequest request, String bearerToken) {
        accountServiceClient.updateBalance(request.getAccountNumber(), "CREDIT", request.getAmount(), bearerToken);

        Transaction txn = Transaction.builder()
                .referenceNumber(generateReference())
                .type(TransactionType.DEPOSIT)
                .fromAccount(null)
                .toAccount(request.getAccountNumber())
                .amount(request.getAmount())
                .status(TransactionStatus.SUCCESS)
                .remarks("Cash deposit")
                .build();

        Transaction saved = transactionRepository.save(txn);
        publishEvent(saved);
        return toResponse(saved);
    }

    public TransactionResponse withdraw(WithdrawRequest request, String bearerToken) {
        accountServiceClient.updateBalance(request.getAccountNumber(), "DEBIT", request.getAmount(), bearerToken);

        Transaction txn = Transaction.builder()
                .referenceNumber(generateReference())
                .type(TransactionType.WITHDRAWAL)
                .fromAccount(request.getAccountNumber())
                .toAccount(null)
                .amount(request.getAmount())
                .status(TransactionStatus.SUCCESS)
                .remarks("Cash withdrawal")
                .build();

        Transaction saved = transactionRepository.save(txn);
        publishEvent(saved);
        return toResponse(saved);
    }

    public TransactionResponse transfer(TransferRequest request, String bearerToken) {
        accountServiceClient.updateBalance(request.getFromAccountNumber(), "DEBIT", request.getAmount(), bearerToken);

        try {
            accountServiceClient.updateBalance(request.getToAccountNumber(), "CREDIT", request.getAmount(), bearerToken);
        } catch (Exception ex) {
            accountServiceClient.updateBalance(request.getFromAccountNumber(), "CREDIT", request.getAmount(), bearerToken);

            Transaction failedTxn = Transaction.builder()
                    .referenceNumber(generateReference())
                    .type(TransactionType.TRANSFER)
                    .fromAccount(request.getFromAccountNumber())
                    .toAccount(request.getToAccountNumber())
                    .amount(request.getAmount())
                    .status(TransactionStatus.FAILED)
                    .remarks("Transfer failed, source refunded: " + ex.getMessage())
                    .build();
            Transaction savedFailed = transactionRepository.save(failedTxn);
            publishEvent(savedFailed);

            throw ex;
        }

        Transaction txn = Transaction.builder()
                .referenceNumber(generateReference())
                .type(TransactionType.TRANSFER)
                .fromAccount(request.getFromAccountNumber())
                .toAccount(request.getToAccountNumber())
                .amount(request.getAmount())
                .status(TransactionStatus.SUCCESS)
                .remarks("Fund transfer")
                .build();

        Transaction saved = transactionRepository.save(txn);
        publishEvent(saved);
        return toResponse(saved);
    }

    public List<TransactionResponse> getHistory(String accountNumber) {
        return transactionRepository
                .findByFromAccountOrToAccountOrderByCreatedAtDesc(accountNumber, accountNumber)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private void publishEvent(Transaction txn) {
        TransactionEvent event = TransactionEvent.builder()
                .referenceNumber(txn.getReferenceNumber())
                .type(txn.getType())
                .fromAccount(txn.getFromAccount())
                .toAccount(txn.getToAccount())
                .amount(txn.getAmount())
                .status(txn.getStatus())
                .timestamp(txn.getCreatedAt())
                .build();
        eventPublisher.publish(event);
    }

    private String generateReference() {
        StringBuilder sb = new StringBuilder("TXN");
        for (int i = 0; i < 12; i++) {
            sb.append(RANDOM.nextInt(10));
        }
        return sb.toString();
    }

    private TransactionResponse toResponse(Transaction txn) {
        return TransactionResponse.builder()
                .id(txn.getId())
                .referenceNumber(txn.getReferenceNumber())
                .type(txn.getType())
                .fromAccount(txn.getFromAccount())
                .toAccount(txn.getToAccount())
                .amount(txn.getAmount())
                .status(txn.getStatus())
                .remarks(txn.getRemarks())
                .createdAt(txn.getCreatedAt())
                .build();
    }
}
