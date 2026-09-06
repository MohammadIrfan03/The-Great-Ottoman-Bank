package com.ottomanbank.notificationservice.listener;

import com.ottomanbank.notificationservice.dto.TransactionEvent;
import com.ottomanbank.notificationservice.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class TransactionEventListener {

    private final NotificationService notificationService;

    @KafkaListener(topics = "transaction-events", groupId = "notification-service-group")
    public void handleTransactionEvent(TransactionEvent event) {
        log.info("Received transaction event: {}", event.getReferenceNumber());
        notificationService.processTransactionEvent(event);
    }
}