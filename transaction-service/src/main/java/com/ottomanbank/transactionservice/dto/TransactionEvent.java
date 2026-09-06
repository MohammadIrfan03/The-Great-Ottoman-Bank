package com.ottomanbank.transactionservice.dto;

import com.ottomanbank.transactionservice.entity.TransactionStatus;
import com.ottomanbank.transactionservice.entity.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Event published to Kafka whenever a transaction completes.
 * notification-service and audit-service both consume this same event
 * from the "transaction-events" topic.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionEvent implements Serializable {
    private String referenceNumber;
    private TransactionType type;
    private String fromAccount;
    private String toAccount;
    private BigDecimal amount;
    private TransactionStatus status;
    private LocalDateTime timestamp;
}