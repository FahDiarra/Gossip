package com.gossip.backend.service;

import com.gossip.backend.dto.AuthResponse;
import com.gossip.backend.dto.LoginRequest;
import com.gossip.backend.dto.RegisterRequest;
import com.gossip.backend.entity.User;
import com.gossip.backend.repository.UserRepository;
import com.gossip.backend.security.JwtService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest request) {

        String name = request.getName().trim();
        String userName = request.getUserName().trim();
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
                    "Invalid email or password",
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
                    "Invalid email or password",
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
}