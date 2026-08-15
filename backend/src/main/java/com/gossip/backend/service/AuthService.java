package com.gossip.backend.service;

import com.gossip.backend.dto.AuthResponse;
import com.gossip.backend.dto.LoginRequest;
import com.gossip.backend.dto.RegisterRequest;
import com.gossip.backend.entity.User;
import com.gossip.backend.repository.UserRepository;
import com.gossip.backend.security.JwtService;


import com.gossip.backend.dto.UserNameSuggestionsResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private String normalizeUsername(String userName) {

        userName = userName
                .trim()
                .replaceAll("[^a-zA-Z0-9]", "");

        return "@" + userName;
    }


    public AuthResponse register(RegisterRequest request) {

        String name = request.getName().trim();
        String userName = normalizeUsername(request.getUserName());
        String email = request.getNewEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(email)) {

            return new AuthResponse(
                    false,
                    "Email is already in use",
                    null,
                    null
            );
        }

        if (userRepository.existsByUserName(userName)) {

            return new AuthResponse(
                    false,
                    "Username is already in use",
                    null,
                    null
            );
        }

        User user = new User();

        user.setName(name);
        user.setUserName(userName);
        user.setEmail(email);

        // Never save the raw password
        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );

        User savedUser = userRepository.save(user);

        String token = jwtService.generateToken(
                savedUser.getId(),
                savedUser.getPublicId()
        );

        return new AuthResponse(
                true,
                "Account created successfully",
                token,
                new AuthResponse.UserResponse(savedUser)
        );
    }

    public AuthResponse login(LoginRequest request) {

        String email = request.getEmail()
                .trim()
                .toLowerCase();

        User user = userRepository
                .findByEmail(email)
                .orElse(null);

        if (user == null) {

            return new AuthResponse(
                    false,
                    "error_credentials",
                    null,
                    null
            );
        }

        boolean passwordMatches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!passwordMatches) {

            return new AuthResponse(
                    false,
                    "error_credentials",
                    null,
                    null
            );
        }

        String token = jwtService.generateToken(
                user.getId(),
                user.getPublicId()
        );

        return new AuthResponse(
                true,
                "Login successful",
                token,
                new AuthResponse.UserResponse(user)
        );
    }



    public UserNameSuggestionsResponse getUserNameSuggestions(
            String userName
    ) {

         userName = normalizeUsername(userName);

        boolean exists =
                userRepository.existsByUserName(userName);

        List<String> suggestions = new ArrayList<>();

        if (!exists) {
            return new UserNameSuggestionsResponse(
                    false,
                    suggestions
            );
        }

        int attempts = 0;

        while (suggestions.size() < 3 && attempts < 50) {

            attempts++;

            int randomNumber =
                    ThreadLocalRandom.current()
                            .nextInt(100, 10000);

            String suggestion =
                    userName+ randomNumber;

            if (!userRepository.existsByUserName(suggestion)
                    && !suggestions.contains(suggestion)) {

                suggestions.add(suggestion);
            }
        }

        return new UserNameSuggestionsResponse(
                true,
                suggestions
        );
    }


    public boolean emailExists(String email) {

        email = email.trim().toLowerCase();

        return userRepository.existsByEmail(email);
    }



}