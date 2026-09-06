package com.ottomanbank.transactionservice.dto;

import com.ottomanbank.transactionservice.entity.TransactionStatus;
import com.ottomanbank.transactionservice.entity.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionResponse {
    private Long id;
    private String referenceNumber;
    private TransactionType type;
    private String fromAccount;
    private String toAccount;
    private BigDecimal amount;
    private TransactionStatus status;
    private String remarks;
    private LocalDateTime createdAt;
}