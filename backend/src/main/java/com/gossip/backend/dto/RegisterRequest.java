package com.gossip.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RegisterRequest {

    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 50)
    private String name;

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 30)
    private String userName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email")
    private String newEmail;

    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 64)
    private String newPassword;
}