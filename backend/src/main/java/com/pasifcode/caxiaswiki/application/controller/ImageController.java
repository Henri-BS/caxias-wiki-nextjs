package com.pasifcode.caxiaswiki.application.controller;

import com.pasifcode.caxiaswiki.domain.entity.Image;
import com.pasifcode.caxiaswiki.domain.entity.Wiki;
import com.pasifcode.caxiaswiki.domain.enums.ImageExtension;
import com.pasifcode.caxiaswiki.domain.dto.ImageDto;
import com.pasifcode.caxiaswiki.application.mapper.ImageMapper;
import com.pasifcode.caxiaswiki.service.interf.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;

@RestController
@RequestMapping("/v1/images")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;
    private final ImageMapper imageMapper;

    @PostMapping
    public ResponseEntity saveImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("name") String name,
            @RequestParam("notes") String notes,
            @RequestParam("wiki") Wiki wiki
    ) throws IOException {

        Image image = imageMapper.mapToImage(file, name, notes, wiki);
        Image savedImage = imageService.saveImage(image);
        URI imageUri = buildURL(savedImage);

        return ResponseEntity.created(imageUri).build();
    }

    @GetMapping
    public ResponseEntity<Page<ImageDto>> searchImage(
            @RequestParam Wiki wikiId,
            @RequestParam(required = false, defaultValue = "") String query,
            Pageable pageable
            ){
        var result = imageService.searchImage(wikiId, pageable);

        var images = result.map(image -> {
            var url = buildURL(image);
            try {
                return imageMapper.imageToDto(image, url.toString());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
        return ResponseEntity.ok(images);
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
        headers.setContentDispositionFormData("inline; filename=\"" + image.getFileName() + "\"", image.getFileName());
        return new ResponseEntity<>(image.getFile(), headers, HttpStatus.OK);
    }

    private URI buildURL(Image image) {
        String imagePath =  "/" + image.getId();
        return ServletUriComponentsBuilder
                .fromCurrentRequestUri()
                .path(imagePath)
                .build().toUri();
    }
}
