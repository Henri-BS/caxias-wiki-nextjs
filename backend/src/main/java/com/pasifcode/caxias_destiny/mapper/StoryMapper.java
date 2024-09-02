package com.pasifcode.caxias_destiny.mapper;

import com.pasifcode.caxias_destiny.domain.entity.Story;
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
}
