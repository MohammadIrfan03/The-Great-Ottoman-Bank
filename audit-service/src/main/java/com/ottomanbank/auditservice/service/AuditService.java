package com.ottomanbank.auditservice.service;

import com.ottomanbank.auditservice.dto.TransactionEvent;
import com.ottomanbank.auditservice.entity.AuditLog;
import com.ottomanbank.auditservice.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuditService {

    private final AuditLogRepository auditLogRepository;

    public void recordEvent(TransactionEvent event) {
        AuditLog log = AuditLog.builder()
                .referenceNumber(event.getReferenceNumber())
                .actionType(event.getType())
                .fromAccount(event.getFromAccount())
                .toAccount(event.getToAccount())
                .amount(event.getAmount())
                .outcome(event.getStatus())
                .build();

        auditLogRepository.save(log);

        AuditService.log.info("Audit trail recorded: [{}] {} - {} -> {} amount {} - {}",
                event.getReferenceNumber(), event.getType(),
                event.getFromAccount(), event.getToAccount(),
                event.getAmount(), event.getStatus());
    }
}