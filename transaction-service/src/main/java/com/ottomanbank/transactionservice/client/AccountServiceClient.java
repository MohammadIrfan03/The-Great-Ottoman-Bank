package com.ottomanbank.transactionservice.client;

import com.ottomanbank.transactionservice.dto.AccountBalanceUpdateRequest;
import com.ottomanbank.transactionservice.dto.AccountResponse;
import com.ottomanbank.transactionservice.exception.AccountServiceException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

/**
 * Talks to account-service over plain REST (hardcoded base URL, no
 * Eureka-based load balancing - kept simple by design for this project).
 * Forwards the caller's own JWT so account-service's security filter
 * accepts the internal call.
 */
@Component
@RequiredArgsConstructor
public class AccountServiceClient {

    private final RestTemplate restTemplate;

    @Value("${services.account-service.url}")
    private String accountServiceUrl;

    public AccountResponse getAccount(String accountNumber, String bearerToken) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", bearerToken);
            HttpEntity<Void> entity = new HttpEntity<>(headers);

            var response = restTemplate.exchange(
                    accountServiceUrl + "/api/accounts/" + accountNumber,
                    HttpMethod.GET,
                    entity,
                    AccountResponse.class
            );
            return response.getBody();
        } catch (RestClientException ex) {
            throw new AccountServiceException("Could not fetch account " + accountNumber + ": " + ex.getMessage());
        }
    }

    public AccountResponse updateBalance(String accountNumber, String operation, java.math.BigDecimal amount, String bearerToken) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", bearerToken);
            headers.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);

            AccountBalanceUpdateRequest body = AccountBalanceUpdateRequest.builder()
                    .amount(amount)
                    .operation(operation)
                    .build();

            HttpEntity<AccountBalanceUpdateRequest> entity = new HttpEntity<>(body, headers);

            var response = restTemplate.exchange(
                    accountServiceUrl + "/api/accounts/" + accountNumber + "/balance",
                    HttpMethod.PUT,
                    entity,
                    AccountResponse.class
            );
            return response.getBody();
        } catch (RestClientException ex) {
            throw new AccountServiceException("Balance update failed for " + accountNumber + ": " + ex.getMessage());
        }
    }
}