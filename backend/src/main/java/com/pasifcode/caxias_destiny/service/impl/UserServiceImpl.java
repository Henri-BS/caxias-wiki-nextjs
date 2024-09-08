package com.pasifcode.caxias_destiny.service.impl;

import com.pasifcode.caxias_destiny.domain.AccessToken;
import com.pasifcode.caxias_destiny.domain.entity.User;
import com.pasifcode.caxias_destiny.domain.exception.DuplicatedTupleException;
import com.pasifcode.caxias_destiny.infra.repository.UserRepository;
import com.pasifcode.caxias_destiny.service.interf.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
private final JwtService jwtService;

    @Override
    @Transactional
    public User saveUser(User user) {
        var possibleUser = findUserByEmail(user.getEmail());
        if (possibleUser != null) {
            throw new DuplicatedTupleException("Usuário já existe!");
        }
        encodePassword(user);
        return userRepository.save(user);
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public AccessToken authenticate(String email, String password) {
        var user = findUserByEmail(email);
        if(user == null){
            return null;
        }

        boolean matches = passwordEncoder.matches(password, user.getPassword());
        if (matches){
            return jwtService.generateToken(user);
        }
        return null;
    }

    private void encodePassword(User user){
        String rawPassword = user.getPassword();
        String encodedPassword = passwordEncoder.encode(rawPassword);
        user.setPassword(encodedPassword);
    }
}
