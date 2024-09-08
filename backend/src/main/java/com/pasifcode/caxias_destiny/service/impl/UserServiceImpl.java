package com.pasifcode.caxias_destiny.service.impl;

import com.pasifcode.caxias_destiny.domain.AccessToken;
import com.pasifcode.caxias_destiny.domain.entity.Story;
import com.pasifcode.caxias_destiny.domain.entity.User;
import com.pasifcode.caxias_destiny.domain.exception.DuplicatedTupleException;
import com.pasifcode.caxias_destiny.infra.repository.UserRepository;
import com.pasifcode.caxias_destiny.service.interf.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public User saveUser(User user) {
        var possibleUser = findUserByEmail(user.getEmail());
        if (possibleUser != null) {
throw new DuplicatedTupleException("Usuário já existe!");
        }
        return userRepository.save(user);
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public AccessToken authenticate(String email, String password) {
        return null;
    }
}
