package com.gossip.backend.dto;

import com.gossip.backend.entity.User;

import lombok.Getter;

import java.time.LocalDateTime;

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
        private final LocalDateTime createdAt;

        private final String profilePhoto;
        private final String coverPhoto;
        private final String bio;

        public UserResponse(User user) {
            this.publicId = user.getPublicId();
            this.name = user.getName();
            this.userName = user.getUserName();
            this.email = user.getEmail();
            this.createdAt = user.getCreatedAt();

            this.profilePhoto = user.getProfilePhoto();
            this.coverPhoto = user.getCoverPhoto();
            this.bio = user.getBio();


        }
    }
}