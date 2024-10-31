package com.pasifcode.caxiaswiki.application.mapper;

import com.pasifcode.caxiaswiki.domain.dto.UserDto;
import com.pasifcode.caxiaswiki.domain.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public User mapToUser(UserDto dto){
        return User.builder()
                .email(dto.getEmail())
                .name(dto.getName())
                .password(dto.getPassword())
                .bio(dto.getBio())
                .build();
    }
}
