package com.example.demo.controller;
//
//import org.springframework.http.*;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.client.HttpClientErrorException;
//import org.springframework.web.client.HttpServerErrorException;
//import org.springframework.web.client.HttpStatusCodeException;
//import org.springframework.web.client.RestTemplate;
//
//@Controller
//@RequestMapping("/pay")
//public class ProxyController {
//
//    //private final String targetUrl = "https://tenant-tracker.chargeover.com/api/v3/transaction?action=pay";
//
//    @PostMapping("/api/v3/transaction")
//    public ResponseEntity<String> processPayment(@RequestBody String requestBody) {
//        // URL of the external API
//        System.out.println(requestBody);
//        String apiUrl = "https://tenant-tracker.chargeover.com/api/v3/transaction?action=pay";
//
//        // Your Basic Auth credentials
//        String username = "k7YfStZ9M6I5DVb1o24QlPnJpK8gu0RX";
//        String password = "V8LK4lYBXWEbakOjfGI6sZ173uFAdgSn";
//
//        // Set up Basic Authentication headers
//        HttpHeaders headers = new HttpHeaders();
//        headers.setBasicAuth(username, password);
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//
//        // Create a request entity with headers and body
//        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
//
//        // Create a RestTemplate instance
//        RestTemplate restTemplate = new RestTemplate();
//
//        try {
//            ResponseEntity<String> responseEntity = restTemplate.exchange(
//                    apiUrl,
//                    HttpMethod.POST,
//                    requestEntity,
//                    String.class
//            );
//
//            return ResponseEntity.ok(responseEntity.getBody());
//        } catch (HttpClientErrorException | HttpServerErrorException e) {
//            // Log the error details for debugging
//            e.printStackTrace(); // Or use a logging framework like SLF4J or Log4j
//
//            // Handle HTTP-specific errors with appropriate status code and message
//            return ResponseEntity.status(e.getRawStatusCode()).body(e.getResponseBodyAsString());
//        } catch (Exception e) {
//            // Log other unexpected exceptions
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing payment");
//        }
//    }
//}

import org.apache.http.HttpResponse;
import org.apache.http.auth.AuthenticationException;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.SSLContextBuilder;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.auth.BasicScheme;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.HttpClients;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

@Controller
@RequestMapping("/pay")
public class ProxyController {
    String username = "k7YfStZ9M6I5DVb1o24QlPnJpK8gu0RX";
    String password = "V8LK4lYBXWEbakOjfGI6sZ173uFAdgSn";

    @PostMapping("/api/v3/transaction")
    public ResponseEntity<String> processPaymentWithApacheHttpClient(@RequestBody String requestBody) {
        String apiUrl = "https://tenant-tracker.chargeover.com/api/v3/transaction?action=pay";

        try {
            SSLContextBuilder builder = new SSLContextBuilder();
            builder.loadTrustMaterial(null, new TrustStrategy() {
                @Override
                public boolean isTrusted(X509Certificate[] chain, String authType) throws CertificateException {
                    return true; // Trust all certificates (not recommended in production)
                }
            });

            HttpClient httpClient = HttpClients.custom()
                    .setSSLContext(builder.build())
                    .setSSLHostnameVerifier(NoopHostnameVerifier.INSTANCE)
                    .build();

            HttpPost request = new HttpPost(apiUrl);
            request.addHeader("Content-Type", "application/json");
            // Set Basic Authentication header
            UsernamePasswordCredentials creds = new UsernamePasswordCredentials(username, password);
            request.addHeader(new BasicScheme().authenticate(creds, request, null));
            request.setEntity(new StringEntity(requestBody));

            HttpResponse response = httpClient.execute(request);

            // Read the response content
            BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
            StringBuilder responseBody = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                responseBody.append(line);
            }

            return ResponseEntity.ok(responseBody.toString());
        } catch (IOException | NoSuchAlgorithmException | KeyManagementException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing payment");
        } catch (KeyStoreException e) {
            throw new RuntimeException(e);
        } catch (AuthenticationException e) {
            throw new RuntimeException(e);
        }
    }
    @GetMapping("/api/v3/transaction/all")
    public ResponseEntity<String> getAllTransactions() {
        String apiUrl = "https://tenant-tracker.chargeover.com/api/v3/transaction?limit=30&order=transaction_id:DESC";

        try {
            SSLContextBuilder builder = new SSLContextBuilder();
            builder.loadTrustMaterial(null, new TrustStrategy() {
                @Override
                public boolean isTrusted(X509Certificate[] chain, String authType) throws CertificateException {
                    return true; // Trust all certificates (not recommended in production)
                }
            }); // Trust all certificates (not recommended in production)

            HttpClient httpClient = HttpClients.custom()
                    .setSSLContext(builder.build())
                    .setSSLHostnameVerifier(NoopHostnameVerifier.INSTANCE)
                    .build();

            HttpGet request = new HttpGet(apiUrl);

            // Set Basic Authentication header
            String auth = username + ":" + password;
            byte[] encodedAuth = java.util.Base64.getEncoder().encode(auth.getBytes());
            String authHeader = "Basic " + new String(encodedAuth);
            request.setHeader("Authorization", authHeader);
            request.setHeader("Accept", "application/json");

            HttpResponse response = httpClient.execute(request);

            // Read the response content
            BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
            StringBuilder responseBody = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                responseBody.append(line);
            }
            System.out.println(reader);
            return ResponseEntity.ok(responseBody.toString());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching transaction data");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        } catch (KeyStoreException e) {
            throw new RuntimeException(e);
        } catch (KeyManagementException e) {
            throw new RuntimeException(e);
        }
    }


    @GetMapping("/api/v3/transaction/{customerId}")
    public ResponseEntity<String> getTransactionData(@PathVariable String customerId) {
        String apiUrl = "https://tenant-tracker.chargeover.com/api/v3/transaction?where=customer_id:EQUALS:" + customerId +"&limit=100&order=transaction_id:DESC";


        try {
            SSLContextBuilder builder = new SSLContextBuilder();
            builder.loadTrustMaterial(null, new TrustStrategy() {
                @Override
                public boolean isTrusted(X509Certificate[] chain, String authType) throws CertificateException {
                    return true; // Trust all certificates (not recommended in production)
                }
            }); // Trust all certificates (not recommended in production)

            HttpClient httpClient = HttpClients.custom()
                    .setSSLContext(builder.build())
                    .setSSLHostnameVerifier(NoopHostnameVerifier.INSTANCE)
                    .build();

            HttpGet request = new HttpGet(apiUrl);

            // Set Basic Authentication header
            String auth = username + ":" + password;
            byte[] encodedAuth = java.util.Base64.getEncoder().encode(auth.getBytes());
            String authHeader = "Basic " + new String(encodedAuth);
            request.setHeader("Authorization", authHeader);
            request.setHeader("Accept", "application/json");

            HttpResponse response = httpClient.execute(request);

            // Read the response content
            BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
            StringBuilder responseBody = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                responseBody.append(line);
            }
            System.out.println(reader);
            return ResponseEntity.ok(responseBody.toString());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching transaction data");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        } catch (KeyStoreException e) {
            throw new RuntimeException(e);
        } catch (KeyManagementException e) {
            throw new RuntimeException(e);
        }
    }


}
