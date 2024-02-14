package com.manh.socialmedia.controller;

import com.manh.socialmedia.models.User;
import com.manh.socialmedia.request.LoginRequest;
import com.manh.socialmedia.response.AuthResponse;
import com.manh.socialmedia.security.jwt.JwtProvider;
import com.manh.socialmedia.security.user.CustomerUserDetailsService;
import com.manh.socialmedia.service.UserService;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final CustomerUserDetailsService customerUserDetailsService;


    public AuthController(UserService userService, JwtProvider jwtProvider, PasswordEncoder passwordEncoder, CustomerUserDetailsService customerUserDetailsService) {
        this.userService = userService;
        this.jwtProvider = jwtProvider;
        this.passwordEncoder = passwordEncoder;
        this.customerUserDetailsService = customerUserDetailsService;
    }

    @PostMapping("/signup")
    public AuthResponse registerUser(@RequestBody User user) throws Exception {
        User savedUser = userService.createUser(user);
        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(), savedUser.getPassword());

        String token = jwtProvider.generateToken(authentication);

        return new AuthResponse(token, "Register successfully");
    }

    @PostMapping("/signin")
    public AuthResponse loginUser(@RequestBody @Valid LoginRequest loginRequest) throws Exception {
        Authentication authentication = authenticate(loginRequest.getEmail(), loginRequest.getPassword());

        String token = jwtProvider.generateToken(authentication);

        return new AuthResponse(token, "Login successfully");
    }

    private Authentication authenticate(String email, String password) {
        UserDetails userDetails = customerUserDetailsService.loadUserByUsername(email);

        if(userDetails == null) {
            throw new BadCredentialsException("Invalid username");
        }

        if(!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Your password not matched");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

}
