package com.pasifcode.caxias_destiny.domain.dto;


import lombok.Data;


@Data
public class UserDto {
    private String id;
    private String name;
    private String bio;
    private String email;
    private String password;
}
