package com.gossip.backend.dto;

import com.gossip.backend.entity.User;

import lombok.Getter;

public record AuthResponse(
        boolean success,
        String message,
        String token,
        UserResponse user) {

    @Getter
    public static class UserResponse {

        private final String publicId;
        private final String name;
        private final String userName;
        private final String email;


        public UserResponse(User user) {
            this.publicId = user.getPublicId();
            this.name = user.getName();
            this.userName = user.getUserName();
            this.email = user.getEmail();
        }
    }
}