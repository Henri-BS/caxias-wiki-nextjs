package com.pasifcode.caxias_destiny.service.impl;

import com.pasifcode.caxias_destiny.domain.dto.StoryDto;
import com.pasifcode.caxias_destiny.domain.entity.Story;
import com.pasifcode.caxias_destiny.infra.repository.StoryRepository;
import com.pasifcode.caxias_destiny.service.interf.StoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StoryServiceImpl implements StoryService {

    private final StoryRepository storyRepository;

    @Override
    @Transactional
    public Story saveStory(Story story) {
        return storyRepository.save(story);
    }

    @Override
    public List<Story> searchStory(String query){
        return storyRepository.findByNameOrLocationsOrTagsLike(query);
    }

    @Override
    public Story findStoryById(String id) {
        return storyRepository.findById(id).orElseThrow();
    }
}
