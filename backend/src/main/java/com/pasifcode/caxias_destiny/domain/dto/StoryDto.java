package com.pasifcode.caxias_destiny.domain.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class StoryDto {
    private String id;
    private String name;
    private String description;
}
