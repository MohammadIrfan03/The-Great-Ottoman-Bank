package com.ottomanbank.transactionservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * Mirrors account-service's BalanceUpdateRequest DTO.
 * Used when transaction-service calls account-service over REST.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccountBalanceUpdateRequest {
    private BigDecimal amount;
    private String operation; // "CREDIT" or "DEBIT"
}