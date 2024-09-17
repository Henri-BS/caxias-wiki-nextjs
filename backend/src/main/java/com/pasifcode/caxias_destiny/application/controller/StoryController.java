package com.pasifcode.caxias_destiny.application.controller;

import com.pasifcode.caxias_destiny.domain.entity.Story;
import com.pasifcode.caxias_destiny.domain.dto.StoryDto;
import com.pasifcode.caxias_destiny.application.mapper.StoryMapper;
import com.pasifcode.caxias_destiny.service.interf.StoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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
            @RequestParam("imageUrl") String imageUrl,
            @RequestParam("tags") List<String> tags
    ) throws IOException {
        log.info("Nome definido para a publicação: {}", name);
        Story story = storyMapper.mapToStory(name, description, imageUrl, tags);
        storyService.saveStory(story);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StoryDto> findStoryById(@PathVariable String id){
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


}
