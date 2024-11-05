package com.pasifcode.caxiaswiki.application.mapper;

import com.pasifcode.caxiaswiki.domain.entity.Image;
import com.pasifcode.caxiaswiki.domain.entity.Wiki;
import com.pasifcode.caxiaswiki.domain.enums.ImageExtension;
import com.pasifcode.caxiaswiki.domain.dto.ImageDto;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
public class ImageMapper {
    public Image mapToImage(MultipartFile file, String name, String notes, Wiki wiki) throws IOException {
        return Image.builder()
                .name(name)
                .notes(notes)
                .extension(ImageExtension.valueOf(MediaType.valueOf(file.getContentType())))
                .file(file.getBytes())
                .wiki(wiki)
                .build();
    }

    public ImageDto imageToDto(Image entity, String url) throws IOException {
        return ImageDto.builder()
                .url(url)
                .extension(entity.getExtension().name())
                .name(entity.getName())
                .notes(entity.getNotes())
                .uploadDate(entity.getUploadDate())
                .wikiId(entity.getWiki().getId())
                .build();
    }
}