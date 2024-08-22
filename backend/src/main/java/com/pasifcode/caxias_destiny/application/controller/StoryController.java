package com.pasifcode.caxias_destiny.application.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v2/stories")
@Slf4j
public class StoryController {

    @PostMapping
    public ResponseEntity saveStory(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("location") String location,
            @RequestParam("tags") List<String> tags
    ){
        log.info("Nome definido para a imagem: {}", name);
        log.info("Descrição: {}", description);
        log.info("Localização: {}", location);
        log.info("Tags: {}", tags);
        return ResponseEntity.ok().build();
    }
}
