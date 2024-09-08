package com.pasifcode.caxias_destiny.service.interf;

import com.pasifcode.caxias_destiny.domain.AccessToken;
import com.pasifcode.caxias_destiny.domain.entity.User;

public interface UserService {
    User saveUser(User user);
    User findUserByEmail(String email);
    AccessToken authenticate(String email, String password);
}
