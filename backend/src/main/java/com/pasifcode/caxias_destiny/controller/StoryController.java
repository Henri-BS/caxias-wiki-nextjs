package com.pasifcode.caxias_destiny.controller;

import com.pasifcode.caxias_destiny.domain.entity.Image;
import com.pasifcode.caxias_destiny.domain.entity.Story;
import com.pasifcode.caxias_destiny.service.interf.StoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v2/stories")
@Slf4j
@RequiredArgsConstructor
public class StoryController {

    private final StoryService storyService;

    @PostMapping
    public ResponseEntity saveStory(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("location") List<String> location,
            @RequestParam("tags") List<String> tags
    ){
        log.info("Nome definido para a publicação: {}", name);
        Story story = Story.builder()
                .name(name)
                .description(description)
                .location(String.join(", ", location))
                .tags(String.join(", ", tags))
                .build();
        storyService.saveStory(story);
        return ResponseEntity.ok().build();
    }
}
