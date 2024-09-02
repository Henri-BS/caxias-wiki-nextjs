package com.pasifcode.caxias_destiny.controller;

import com.pasifcode.caxias_destiny.domain.entity.Image;
import com.pasifcode.caxias_destiny.domain.entity.Story;
import com.pasifcode.caxias_destiny.mapper.StoryMapper;
import com.pasifcode.caxias_destiny.service.interf.StoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/v1/stories")
@Slf4j
@RequiredArgsConstructor
public class StoryController {

    private final StoryService storyService;
    private final StoryMapper storyMapper;

    @PostMapping
    public ResponseEntity saveStory(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("location") List<String> location,
            @RequestParam("tags") List<String> tags
    ){
        log.info("Nome definido para a publicação: {}", name);
        Story story = storyMapper.mapToStory(name, description, location, tags);

        Story savedStory = storyService.saveStory(story);

        URI storyUri = buildStoryURL(savedStory);

        return ResponseEntity.created(storyUri).build();
    }
    private URI buildStoryURL(Story story){
        String storyPath = "/" + story.getId();
        return ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path(storyPath)
                .build().toUri();
    }
}
