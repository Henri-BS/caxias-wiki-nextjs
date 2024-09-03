package com.pasifcode.caxias_destiny.application.mapper;

import com.pasifcode.caxias_destiny.domain.entity.Story;
import com.pasifcode.caxias_destiny.domain.dto.StoryDto;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class StoryMapper {

    public Story mapToStory(String name, String description, List<String> locations,  List<String> tags ){
        return Story.builder()
                .name(name)
                .description(description)
                .locations(String.join( ", ", locations))
                .tags(String.join(", ", tags))
                .build();
    }

    public StoryDto storyToDto(Story entity){
        return StoryDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .build();
    }
}
