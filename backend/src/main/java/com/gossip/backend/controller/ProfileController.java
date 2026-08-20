package com.gossip.backend.controller;

import com.gossip.backend.dto.AuthResponse;
import com.gossip.backend.entity.User;
import com.gossip.backend.service.ProfileService;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PutMapping( value = "/photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AuthResponse.UserResponse> updateProfilePhoto(
            @RequestParam("file") MultipartFile file,
            Authentication authentication
    ) {
        User user =profileService.getUserFromAuthentication( authentication );
        User updatedUser =profileService.updateProfilePhoto(user,file);
        return ResponseEntity.ok(
                new AuthResponse.UserResponse(updatedUser)
        );
    }


    @PutMapping( value = "/cover", consumes = MediaType.MULTIPART_FORM_DATA_VALUE )
    public ResponseEntity<AuthResponse.UserResponse> updateCoverPhoto(
            @RequestParam("file") MultipartFile file,
            Authentication authentication
    ) {

        User user = profileService.getUserFromAuthentication(authentication);
        User updatedUser = profileService.updateCoverPhoto(user, file);

        return ResponseEntity.ok(
                new AuthResponse.UserResponse(updatedUser)
        );
    }
}