package com.pasifcode.caxiaswiki.application.mapper;

import com.pasifcode.caxiaswiki.domain.dto.WikiDto;
import com.pasifcode.caxiaswiki.domain.entity.Wiki;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class WikiMapper {

    public Wiki mapToWiki(String name, String description, String imageUrl, List<String> tags ) throws IOException {
        return Wiki.builder()
                .name(name)
                .description(description)
                .imageUrl(imageUrl)
                .tags(String.join(", ", tags))
                .build();
    }

    public WikiDto wikiToDto(Wiki entity) {
        return WikiDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .imageUrl(entity.getImageUrl())
                .createdDate(entity.getCreatedDate())
                .build();
    }
}
