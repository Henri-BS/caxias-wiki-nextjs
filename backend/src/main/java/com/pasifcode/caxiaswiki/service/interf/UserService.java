package com.pasifcode.caxiaswiki.service.interf;

import com.pasifcode.caxiaswiki.application.security.AccessToken;
import com.pasifcode.caxiaswiki.domain.entity.User;

public interface UserService {
    User saveUser(User user);
    User findUserByEmail(String email);
    AccessToken authenticate(String email, String password);
}
