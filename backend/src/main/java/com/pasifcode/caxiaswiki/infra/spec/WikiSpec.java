package com.pasifcode.caxiaswiki.infra.spec;

import com.pasifcode.caxiaswiki.domain.entity.Wiki;
import org.springframework.data.jpa.domain.Specification;

public class WikiSpec {

    private WikiSpec(){}

    public static Specification<Wiki> nameLike(String name) {
        return (root, q, cb) -> cb.like(cb.upper(root.get("name")), "%" + name.toUpperCase() + "%");
    }

    public static Specification<Wiki> tagsLike(String tags) {
        return (root, q, cb) -> cb.like(cb.upper(root.get("tags")), "%" + tags.toUpperCase() + "%");
    }
}
