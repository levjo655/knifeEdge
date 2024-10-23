package com.Mojodoo.knifeEdge.controllers;

import com.Mojodoo.knifeEdge.configs.RsaKeyProperties;
import com.nimbusds.jose.jwk.JWKSet;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class JwksController {

    private final RsaKeyProperties rsaKeys;

    public JwksController(RsaKeyProperties rsaKeys) {
        this.rsaKeys = rsaKeys;
    }


    @GetMapping("/.well-known/jwks.json")
    public Map<String, Object> getJwks() {
        JWKSet jwkSet = new JWKSet(new com.nimbusds.jose.jwk.RSAKey.Builder(rsaKeys.getPublicKey()).build());
        return jwkSet.toJSONObject();
    }
}
