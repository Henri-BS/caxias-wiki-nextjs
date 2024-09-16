package com.pasifcode.caxias_destiny.service.interf;

import com.pasifcode.caxias_destiny.domain.entity.Story;

import java.util.List;
import java.util.Optional;

public interface StoryService {
    Story saveStory(Story story);

    List<Story> searchStory(String query);

    Optional<Story> findStoryById(String id);

}
