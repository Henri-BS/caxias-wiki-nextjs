package com.pasifcode.caxias_destiny.service.impl;

import com.pasifcode.caxias_destiny.config.SecretKeyGeneratorConfig;
import com.pasifcode.caxias_destiny.domain.AccessToken;
import com.pasifcode.caxias_destiny.domain.entity.User;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class JwtService {

        private final SecretKeyGeneratorConfig keyGenerator;

        public AccessToken generateToken(User user){

            var key = keyGenerator.getKey();
            var expirationDate = generateExpirationDate();
            var claims = generateTokenClaims(user);

            String token = Jwts
                    .builder()
                    .signWith(key)
                    .subject(user.getEmail())
                    .expiration(expirationDate)
                    .claims(claims)
                    .compact();

            return new AccessToken(token);
        }

        private Date generateExpirationDate(){
            var expirationMinutes = 60;
            LocalDateTime now = LocalDateTime.now().plusMinutes(expirationMinutes);
            return Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
        }

        private Map<String, Object> generateTokenClaims(User user){
            Map<String, Object> claims = new HashMap<>();
            claims.put("name", user.getName());
            return claims;
        }
}
