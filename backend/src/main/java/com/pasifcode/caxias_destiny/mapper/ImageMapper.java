package com.pasifcode.caxias_destiny.mapper;

import com.pasifcode.caxias_destiny.domain.entity.Image;
import com.pasifcode.caxias_destiny.domain.enums.ImageExtension;
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
                .imageExtension(ImageExtension.valueOf(MediaType.valueOf(file.getContentType())))
                .file(file.getBytes())
                .build();
    }

}