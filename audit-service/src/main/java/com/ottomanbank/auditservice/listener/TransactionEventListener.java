package com.ottomanbank.auditservice.listener;

import com.ottomanbank.auditservice.dto.TransactionEvent;
import com.ottomanbank.auditservice.service.AuditService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TransactionEventListener {

    private final AuditService auditService;

    @KafkaListener(topics = "transaction-events", groupId = "audit-service-group")
    public void handleTransactionEvent(TransactionEvent event) {
        auditService.recordEvent(event);
    }
}