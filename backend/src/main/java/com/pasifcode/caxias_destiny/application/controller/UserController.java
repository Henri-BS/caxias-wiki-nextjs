package com.pasifcode.caxias_destiny.application.controller;

import com.pasifcode.caxias_destiny.domain.dto.CredentialsDto;
import com.pasifcode.caxias_destiny.domain.dto.UserDto;
import com.pasifcode.caxias_destiny.application.mapper.UserMapper;
import com.pasifcode.caxias_destiny.domain.entity.User;
import com.pasifcode.caxias_destiny.domain.exception.DuplicatedTupleException;
import com.pasifcode.caxias_destiny.service.interf.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @PostMapping
    public ResponseEntity save(@RequestBody UserDto dto){
        try {
            User user = userMapper.mapToUser(dto);
            userService.saveUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }catch (DuplicatedTupleException e){
            Map<String, String> jsonResultado = Map.of("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(jsonResultado);
        }
    }

    @PostMapping("/auth")
    public ResponseEntity autheticate(@RequestBody CredentialsDto credentials){
        var token = userService.authenticate(credentials.getEmail(), credentials.getPassword());

        if(token == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(token);
    }
}
