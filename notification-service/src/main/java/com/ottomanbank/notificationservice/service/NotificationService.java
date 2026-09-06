package com.ottomanbank.notificationservice.service;

import com.ottomanbank.notificationservice.dto.TransactionEvent;
import com.ottomanbank.notificationservice.entity.Notification;
import com.ottomanbank.notificationservice.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public void processTransactionEvent(TransactionEvent event) {
        String accountNumber = resolveAccountForNotification(event);
        String message = buildMessage(event, accountNumber);

        Notification notification = Notification.builder()
                .referenceNumber(event.getReferenceNumber())
                .accountNumber(accountNumber)
                .message(message)
                .amount(event.getAmount())
                .build();

        notificationRepository.save(notification);

        // Simulated notification delivery - in production this would call
        // an email/SMS provider (SES, Twilio, etc.)
        log.info("Email sent to account holder of {}: \"{}\"", accountNumber, message);
    }

    private String resolveAccountForNotification(TransactionEvent event) {
        // For deposits, notify the receiving account. For withdrawals,
        // notify the source account. For transfers, we notify the sender
        // here (a real system would fire two separate notifications).
        return event.getToAccount() != null ? event.getToAccount() : event.getFromAccount();
    }

    private String buildMessage(TransactionEvent event, String accountNumber) {
        return switch (event.getType()) {
            case "DEPOSIT" -> String.format(
                    "Your account %s has been credited with %s. Ref: %s",
                    accountNumber, event.getAmount(), event.getReferenceNumber());
            case "WITHDRAWAL" -> String.format(
                    "Your account %s has been debited with %s. Ref: %s",
                    accountNumber, event.getAmount(), event.getReferenceNumber());
            case "TRANSFER" -> String.format(
                    "A transfer of %s from account %s to account %s was %s. Ref: %s",
                    event.getAmount(), event.getFromAccount(), event.getToAccount(),
                    event.getStatus(), event.getReferenceNumber());
            default -> String.format("Transaction update on account %s. Ref: %s",
                    accountNumber, event.getReferenceNumber());
        };
    }
}