package com.Mojodoo.knifeEdge.controllers;

import com.Mojodoo.knifeEdge.services.TokenService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
public class AuthController {
    private static final Logger LOG = Logger.getLogger(AuthController.class.getName());

    private final TokenService tokenService;

    public AuthController(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @PostMapping("/token")
    public String token(Authentication authentication) {
        LOG.log(Level.INFO, "Token requested for user: '{0}'", authentication.getName());
        String token = tokenService.generateToken(authentication);
        return token;
    }




}