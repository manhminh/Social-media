package com.manh.socialmedia.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtProvider {
    // Initialization of SecretKey using Keys.secretKeyFor
    private SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String generateToken(Authentication authentication) {
        String jwt = Jwts.builder()
                .setIssuer("MinhManh").setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 864000000)) // Adjusted expiration calculation
                .claim("email", authentication.getName())
                .signWith(key).compact();

        return jwt;
    }

    public String getEmailFromJwtToken(String jwt) {
        jwt = jwt.substring(7);

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key).build().parseClaimsJws(jwt).getBody();

        String email = String.valueOf(claims.get("email"));

        return email;
    }
}
