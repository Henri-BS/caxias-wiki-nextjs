package com.pasifcode.caxias_destiny.application.controller;

import com.pasifcode.caxias_destiny.domain.entity.Story;
import com.pasifcode.caxias_destiny.domain.dto.StoryDto;
import com.pasifcode.caxias_destiny.application.mapper.StoryMapper;
import com.pasifcode.caxias_destiny.service.interf.StoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

    @GetMapping("/{id}")
    public ResponseEntity<StoryDto> findStoryById(@PathVariable String id) {
        var story = storyService.findStoryById(id);
        var dto = storyMapper.storyToDto(story);
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<List<StoryDto>> searchStory(
            @RequestParam(value = "query", required = false, defaultValue = "") String query){
        var result =  storyService.searchStory(query);
        var stories = result.stream().map(storyMapper::storyToDto).toList();

    return ResponseEntity.ok(stories);
    }


    private URI buildStoryURL(Story story){
        String storyPath = "/" + story.getId();
        return ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path(storyPath)
                .build().toUri();
    }
}
