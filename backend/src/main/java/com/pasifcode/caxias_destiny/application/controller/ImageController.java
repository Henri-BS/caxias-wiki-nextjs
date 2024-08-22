package com.pasifcode.caxias_destiny.application.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/v1/images")
@Slf4j
public class ImageController {

    @PostMapping
    public ResponseEntity saveImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("name") String name,
            @RequestParam("font") String font
    ){
        log.info("Imagem recebida: name: {}, size: {}", file.getOriginalFilename(), file.getSize());
        log.info("Nome definido para a imagem: {}", name);
        log.info("Fonte: {}", font);
        return ResponseEntity.ok().build();
    }
}
