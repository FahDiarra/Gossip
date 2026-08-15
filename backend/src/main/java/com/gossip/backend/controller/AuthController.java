package com.gossip.backend.controller;

import com.gossip.backend.dto.AuthResponse;
import com.gossip.backend.dto.LoginRequest;
import com.gossip.backend.dto.RegisterRequest;
import com.gossip.backend.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gossip.backend.dto.UserNameSuggestionsResponse;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request
    ) {

        AuthResponse response =
                authService.register(request);

        if (!response.success()) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(response);
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {

        AuthResponse response =
                authService.login(request);

//        if (!response.success()) {
//
//            return ResponseEntity
//                    .status(HttpStatus.UNAUTHORIZED)
//                    .body(response);
//        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/username-suggestions")
    public ResponseEntity<UserNameSuggestionsResponse> userNameSuggestions(
            @RequestParam String userName
    ) {

        UserNameSuggestionsResponse response =
                authService.getUserNameSuggestions(userName);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmail(
            @RequestParam String email
    ) {

        boolean exists =
                authService.emailExists(email);

        return ResponseEntity.ok(exists);
    }


}