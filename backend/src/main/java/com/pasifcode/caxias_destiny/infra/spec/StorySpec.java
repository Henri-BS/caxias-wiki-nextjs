package com.pasifcode.caxias_destiny.infra.spec;

import com.pasifcode.caxias_destiny.domain.entity.Story;
import org.springframework.data.jpa.domain.Specification;

public class StorySpec {

    private StorySpec(){}

    public static Specification<Story> nameLike(String name) {
        return (root, q, cb) -> cb.like(cb.upper(root.get("name")), "%" + name.toUpperCase() + "%");
    }

    public static Specification<Story> tagsLike(String tags) {
        return (root, q, cb) -> cb.like(cb.upper(root.get("tags")), "%" + tags.toUpperCase() + "%");
    }
}
