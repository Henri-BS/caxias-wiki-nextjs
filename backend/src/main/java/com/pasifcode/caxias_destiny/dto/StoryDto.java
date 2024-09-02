package com.pasifcode.caxias_destiny.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StoryDto {
    private String name;
    private String description;
}
