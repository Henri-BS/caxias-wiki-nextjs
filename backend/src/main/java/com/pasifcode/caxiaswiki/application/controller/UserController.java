package com.pasifcode.caxiaswiki.application.controller;

import com.pasifcode.caxiaswiki.domain.dto.CredentialsDto;
import com.pasifcode.caxiaswiki.domain.dto.UserDto;
import com.pasifcode.caxiaswiki.application.mapper.UserMapper;
import com.pasifcode.caxiaswiki.domain.entity.User;
import com.pasifcode.caxiaswiki.application.exception.DuplicatedTupleException;
import com.pasifcode.caxiaswiki.service.interf.UserService;
import lombok.RequiredArgsConstructor;
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
