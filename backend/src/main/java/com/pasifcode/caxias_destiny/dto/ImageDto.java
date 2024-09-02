package com.pasifcode.caxias_destiny.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ImageDto {
    private String url;
    private String name;
    private String font;
    private String imageExtension;
    private Long size;
    private LocalDateTime uploadDate;
}
