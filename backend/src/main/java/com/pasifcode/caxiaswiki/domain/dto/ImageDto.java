package com.pasifcode.caxiaswiki.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ImageDto {
    private String url;
    private String name;
    private String notes;
    private String extension;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDateTime uploadDate;
    private String wikiId;
}
