package com.gossip.backend.dto;

import jakarta.validation.constraints.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

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

    @NotNull(message = "Birthday is required")
    @Past(message = "Birthday must be in the past")
    private LocalDate birthday;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email")
    private String newEmail;

    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 64)
    private String newPassword;
    private boolean stayConnected = false;
}