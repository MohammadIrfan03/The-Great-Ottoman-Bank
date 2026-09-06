package com.ottomanbank.authservice.service;

import com.ottomanbank.authservice.dto.AuthResponse;
import com.ottomanbank.authservice.dto.LoginRequest;
import com.ottomanbank.authservice.dto.RegisterRequest;
import com.ottomanbank.authservice.entity.Role;
import com.ottomanbank.authservice.entity.User;
import com.ottomanbank.authservice.exception.UserAlreadyExistsException;
import com.ottomanbank.authservice.repository.UserRepository;
import com.ottomanbank.authservice.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException("An account already exists with email: " + request.getEmail());
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.CUSTOMER) // self-registration always creates a CUSTOMER, never ADMIN
                .build();

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        return AuthResponse.builder()
                .token(token)
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (Exception ex) {
            throw new BadCredentialsException("Invalid email or password");
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        return AuthResponse.builder()
                .token(token)
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }
}