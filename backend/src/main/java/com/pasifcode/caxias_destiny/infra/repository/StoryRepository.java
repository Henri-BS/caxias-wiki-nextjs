package com.pasifcode.caxias_destiny.infra.repository;

import com.pasifcode.caxias_destiny.domain.entity.Story;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.util.StringUtils;

import java.util.List;

import static com.pasifcode.caxias_destiny.infra.spec.GenericSpec.*;
import static com.pasifcode.caxias_destiny.infra.spec.StorySpec.*;
import static org.springframework.data.jpa.domain.Specification.where;

public interface StoryRepository extends JpaRepository<Story, String>, JpaSpecificationExecutor<Story> {
    default List<Story> findByNameOrTagsLike(String query) {
        Specification<Story> spec = where(conjuction());

        if (StringUtils.hasText(query)) {
            spec = spec.and(Specification.anyOf(nameLike(query), tagsLike(query)));
        }
        return findAll(spec);
    }
}

