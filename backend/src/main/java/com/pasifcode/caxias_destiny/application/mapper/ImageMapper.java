package com.pasifcode.caxias_destiny.application.mapper;

import com.pasifcode.caxias_destiny.domain.entity.Image;
import com.pasifcode.caxias_destiny.domain.entity.Story;
import com.pasifcode.caxias_destiny.domain.enums.ImageExtension;
import com.pasifcode.caxias_destiny.domain.dto.ImageDto;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
public class ImageMapper {
    public Image mapToImage(MultipartFile file, String name, String notes) throws IOException {
        return Image.builder()
                .name(name)
                .notes(notes)
                .size(file.getSize())
                .extension(ImageExtension.valueOf(MediaType.valueOf(file.getContentType())))
                .file(file.getBytes())
                .build();
    }

    public ImageDto imageToDto(Image entity, String url) throws IOException {
        return ImageDto.builder()
                .url(url)
                .extension(entity.getExtension().name())
                .name(entity.getName())
                .notes(entity.getNotes())
                .size(entity.getSize())
                .uploadDate(entity.getUploadDate())
                .build();
    }
}