package com.ottomanbank.auditservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Mirrors transaction-service's TransactionEvent - the shared contract
 * for the "transaction-events" Kafka topic.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionEvent implements Serializable {
    private String referenceNumber;
    private String type;
    private String fromAccount;
    private String toAccount;
    private BigDecimal amount;
    private String status;
    private LocalDateTime timestamp;
}