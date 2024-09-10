package com.pasifcode.caxias_destiny.application.mapper;

import com.pasifcode.caxias_destiny.domain.dto.UserDto;
import com.pasifcode.caxias_destiny.domain.entity.User;
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
