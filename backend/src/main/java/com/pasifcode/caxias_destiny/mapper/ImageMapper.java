package com.pasifcode.caxias_destiny.mapper;

import com.pasifcode.caxias_destiny.domain.entity.Image;
import com.pasifcode.caxias_destiny.domain.enums.ImageExtension;
import com.pasifcode.caxias_destiny.dto.ImageDto;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
public class ImageMapper {
    public Image mapToImage(MultipartFile file, String name, String font) throws IOException {
        return Image.builder()
                .name(name)
                .font(font)
                .size(file.getSize())
                .extension(ImageExtension.valueOf(MediaType.valueOf(file.getContentType())))
                .file(file.getBytes())
                .build();
    }

    public ImageDto imageToDto(Image entity, String url) throws IOException {
        return ImageDto.builder()
                .url(url)
                .imageExtension(entity.getExtension().name())
                .name(entity.getName())
                .font(entity.getFont())
                .size(entity.getSize())
                .uploadDate(entity.getUploadDate())
                .build();
    }


}