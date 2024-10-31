package com.pasifcode.caxiaswiki.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class WikiDto {
    private String id;
    private String name;
    private String description;
    private String imageUrl;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDateTime createdDate;
}
