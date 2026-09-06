package com.ottomanbank.transactionservice.service;

import com.ottomanbank.transactionservice.dto.TransactionEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class TransactionEventPublisher {

    private static final String TOPIC = "transaction-events";

    private final KafkaTemplate<String, TransactionEvent> kafkaTemplate;

    public void publish(TransactionEvent event) {
        kafkaTemplate.send(TOPIC, event.getReferenceNumber(), event);
        log.info("Published event to Kafka: {}", event.getReferenceNumber());
    }
}
