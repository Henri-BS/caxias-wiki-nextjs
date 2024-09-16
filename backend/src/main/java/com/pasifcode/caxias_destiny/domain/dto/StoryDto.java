package com.pasifcode.caxias_destiny.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class StoryDto {
    private String id;
    private String name;
    private String description;
    private String imageUrl;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDateTime createdDate;
}
