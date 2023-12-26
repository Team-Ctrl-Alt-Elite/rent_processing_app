package com.example.demo.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

@Controller
public class ProxyController {

    private final String targetUrl = "https://tenant-tracker.chargeover.com/api/v3/transaction?action=pay";

    @PostMapping("/api/v3/transaction")
    public ResponseEntity<String> proxyRequest(@RequestBody String requestBody,
            @RequestHeader HttpHeaders headers) {
        RestTemplate restTemplate = new RestTemplate();

        // Set up the request entity
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        // Handle redirects manually
        ResponseEntity<String> responseEntity;
        try {
            responseEntity = restTemplate.exchange(targetUrl, HttpMethod.POST,
                    requestEntity, String.class);
        } catch (HttpStatusCodeException e) {
            if (e.getStatusCode() == HttpStatus.FOUND) {
                // Manually follow redirects
                HttpHeaders redirectHeaders = new HttpHeaders();
                redirectHeaders.setLocation(e.getResponseHeaders().getLocation());

                responseEntity = new ResponseEntity<>(e.getResponseBodyAsString(),
                        redirectHeaders, HttpStatus.OK);
            } else {
                throw e;
            }
        }

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setAccessControlAllowCredentials(true);

        return ResponseEntity
                .status(responseEntity.getStatusCode())
                .headers(responseHeaders)
                .body(responseEntity.getBody());
    }
}