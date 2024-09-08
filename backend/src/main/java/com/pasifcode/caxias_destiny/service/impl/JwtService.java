package com.pasifcode.caxias_destiny.service.impl;

import com.pasifcode.caxias_destiny.domain.AccessToken;
import com.pasifcode.caxias_destiny.domain.entity.User;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    public AccessToken generateToken(User user) {
        return new AccessToken("");
    }
}
