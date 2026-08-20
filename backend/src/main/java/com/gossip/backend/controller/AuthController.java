package com.gossip.backend.controller;

import com.gossip.backend.dto.AuthResponse;
import com.gossip.backend.dto.LoginRequest;
import com.gossip.backend.dto.RegisterRequest;
import com.gossip.backend.dto.UserNameSuggestionsResponse;
import com.gossip.backend.service.AuthService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request,
            HttpServletResponse response
    ) {

        AuthService.AuthResult result =
                authService.register(request);

        if (!result.response().success()) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(result.response());
        }

        addRefreshCookie(
                response,
                result.refreshToken()
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(result.response());
    }


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletResponse response
    ) {

        AuthService.AuthResult result =
                authService.login(request);

//        if (!result.response().success()) {
//
//            return ResponseEntity
//                    .status(HttpStatus.UNAUTHORIZED)
//                    .body(result.response());
//        }

        addRefreshCookie(
                response,
                result.refreshToken()
        );

        return ResponseEntity.ok(result.response());
    }


    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(
            @CookieValue(
                    name = "refresh_token",
                    required = false
            )
            String refreshToken
    ) {

        if (refreshToken == null || refreshToken.isBlank()) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .build();
        }

        try {

            AuthResponse response =
                    authService.refresh(refreshToken);
            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .build();
        }
    }


    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @CookieValue(
                    name = "refresh_token",
                    required = false
            )
            String refreshToken,
            HttpServletResponse response
    ) {

        if (refreshToken != null) {
            authService.logout(refreshToken);
        }

        deleteRefreshCookie(response);

        return ResponseEntity.noContent().build();
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
        boolean exists = authService.emailExists(email);
        return ResponseEntity.ok(exists);
    }


    private void addRefreshCookie(
            HttpServletResponse response,
            String refreshToken
    ) {

        if (refreshToken == null) { return;  }
        Cookie cookie = new Cookie( "refresh_token", refreshToken);
        cookie.setHttpOnly(true);

        // false  localhost HTTP
        // true production HTTPS
        cookie.setSecure(false);

        cookie.setPath("/auth");

        // Example : 30 days
        cookie.setMaxAge( 30 * 24 * 60 * 60 );
        response.addCookie(cookie);
    }

    private void deleteRefreshCookie(
            HttpServletResponse response
    ) {

        Cookie cookie = new Cookie("refresh_token", null );

        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/auth");
        cookie.setMaxAge(0);

        response.addCookie(cookie);
    }



}