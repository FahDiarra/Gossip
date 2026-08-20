package com.gossip.backend.service;

import com.gossip.backend.entity.User;
import com.gossip.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;

    public User getUserFromAuthentication(
            Authentication authentication
    ) {
        Long userId = Long.parseLong(authentication.getName() );
        return userRepository.findById(userId)
                .orElseThrow(() ->  new RuntimeException("User not found") );
    }

    public User updateProfilePhoto(
            User user,
            MultipartFile file
    ) {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException(
                    "Profile photo is required"
            );
        }

        String contentType = file.getContentType();

        if (contentType == null ||
                !contentType.startsWith("image/")) {
            throw new IllegalArgumentException(
                    "File must be an image"
            );
        }

        try {
            String extension = getExtension(file);
            String fileName =
                    user.getPublicId()
                            + "_profile"
                            + extension;

            Path uploadDir =Paths.get("uploads/profile");
            Files.createDirectories(uploadDir);
            Path filePath = uploadDir.resolve(fileName);
            Files.write(filePath, file.getBytes() );
            user.setProfilePhoto( "/uploads/profile/" + fileName  );
            return userRepository.save(user);

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to save profile photo",
                    e
            );
        }
    }

    public User updateCoverPhoto(
            User user,
            MultipartFile file
    ) {

        if (file == null || file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }

        try {
            String extension = getExtension(file);
            String fileName =
                    user.getPublicId()
                            + "_cover"
                            + extension;

            Path uploadDir = Paths.get("uploads/cover");
            Files.createDirectories(uploadDir);
            Path filePath = uploadDir.resolve(fileName);
            Files.write(filePath, file.getBytes());
            user.setCoverPhoto( "/uploads/cover/" + fileName  );
            return userRepository.save(user);

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to save cover photo",
                    e
            );
        }
    }

    private String getExtension(MultipartFile file) {
        String contentType = file.getContentType();

        if ("image/png".equals(contentType)) {
            return ".png";
        }

        if ("image/webp".equals(contentType)) {
            return ".webp";
        }
        return ".jpg";
    }



}