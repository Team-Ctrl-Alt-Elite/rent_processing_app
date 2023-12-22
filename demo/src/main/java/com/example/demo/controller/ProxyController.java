package com.example.demo.controller;

import java.io.IOException;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.client.DefaultResponseErrorHandler;
import org.springframework.web.client.RestTemplate;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class ProxyController {
    private final String targetUrl = "http://tenant-tracker.chargeover.com/api/v3/transaction?action=pay";

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/api/v3/transaction")
    public ResponseEntity<String> proxyRequest(@RequestBody String requestBody, @RequestHeader HttpHeaders headers) {
        RestTemplate restTemplate = new RestTemplate();

        // Set up the request entity
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        // Follow redirects
        restTemplate.setErrorHandler(new DefaultResponseErrorHandler() {
            @Override
            public boolean hasError(org.springframework.http.client.ClientHttpResponse response) throws IOException {
                return false; // Disable the default error handling
            }
        });

        // Forward the request
        ResponseEntity<String> responseEntity = restTemplate.exchange(
                targetUrl, HttpMethod.POST, requestEntity, String.class);

        return ResponseEntity.status(responseEntity.getStatusCode()).body(responseEntity.getBody());
    }
}