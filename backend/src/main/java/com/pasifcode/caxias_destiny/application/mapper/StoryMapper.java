package com.pasifcode.caxias_destiny.application.mapper;

import com.pasifcode.caxias_destiny.domain.entity.Story;
import com.pasifcode.caxias_destiny.domain.dto.StoryDto;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class StoryMapper {

    public Story mapToStory(String name, String description, String imageUrl, List<String> tags ) throws IOException {
        return Story.builder()
                .name(name)
                .description(description)
                .imageUrl(imageUrl)
                .tags(String.join(", ", tags))
                .build();
    }

    public StoryDto storyToDto(Story entity) {
        return StoryDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .imageUrl(entity.getImageUrl())
                .createdDate(entity.getCreatedDate())
                .build();
    }
}
