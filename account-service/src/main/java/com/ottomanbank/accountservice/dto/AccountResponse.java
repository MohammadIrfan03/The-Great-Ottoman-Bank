package com.ottomanbank.accountservice.dto;

import com.ottomanbank.accountservice.entity.AccountType;
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
public class AccountResponse {
    private Long id;
    private String accountNumber;
    private String ownerEmail;
    private String ownerName;
    private AccountType accountType;
    private BigDecimal balance;
    private boolean active;
    private LocalDateTime createdAt;
}