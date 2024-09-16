package com.pasifcode.caxias_destiny.application.controller;

import com.pasifcode.caxias_destiny.domain.entity.Image;
import com.pasifcode.caxias_destiny.domain.enums.ImageExtension;
import com.pasifcode.caxias_destiny.domain.dto.ImageDto;
import com.pasifcode.caxias_destiny.application.mapper.ImageMapper;
import com.pasifcode.caxias_destiny.service.interf.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/v1/images")
@Slf4j
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;
    private final ImageMapper imageMapper;

    @PostMapping
    public ResponseEntity saveImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("name") String name,
            @RequestParam("notes") String notes
    ) throws IOException {
        log.info("Imagem recebida: name: {}, size: {}", file.getOriginalFilename(), file.getSize());

        Image image = imageMapper.mapToImage(file, name, notes);
        Image savedImage = imageService.saveImage(image);
        URI imageUri = buildURL(savedImage);

        return ResponseEntity.created(imageUri).build();
    }

    @GetMapping("{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable String id) {
        var possibleImage = imageService.getImage(id);
        if (possibleImage.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        var image = possibleImage.get();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(image.getExtension().getMediaType());
        headers.setContentLength(image.getSize());
        headers.setContentDispositionFormData("inline; filename=\"" + image.getFileName() + "\"", image.getFileName());
        return new ResponseEntity<>(image.getFile(), headers, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ImageDto>> searchImage(
            @RequestParam(value = "extension", required = false, defaultValue = "") String extension,
            @RequestParam(value = "query", required = false, defaultValue = "") String query){
        var result = imageService.searchImage(ImageExtension.ofName(extension), query);

        var images = result.stream().map(image -> {
            var url = buildURL(image);
            try {
                return imageMapper.imageToDto(image, url.toString());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }).toList();
        return ResponseEntity.ok(images);
    }

    private URI buildURL(Image image) {
        String imagePath = "/" + image.getId();
        return ServletUriComponentsBuilder
                .fromCurrentRequestUri()
                .path(imagePath)
                .build().toUri();
    }
}
