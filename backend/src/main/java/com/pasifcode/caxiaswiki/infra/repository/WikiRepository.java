package com.pasifcode.caxiaswiki.infra.repository;

import com.pasifcode.caxiaswiki.domain.entity.Wiki;
import com.pasifcode.caxiaswiki.infra.spec.GenericSpec;
import com.pasifcode.caxiaswiki.infra.spec.WikiSpec;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.util.StringUtils;

import java.util.List;

import static org.springframework.data.jpa.domain.Specification.where;

public interface WikiRepository extends JpaRepository<Wiki, String>, JpaSpecificationExecutor<Wiki> {
    default List<Wiki> findByNameOrTagsLike(String query) {
        Specification<Wiki> spec = where(GenericSpec.conjuction());

        if (StringUtils.hasText(query)) {
            spec = spec.and(Specification.anyOf(WikiSpec.nameLike(query), WikiSpec.tagsLike(query)));
        }
        return findAll(spec);
    }
}

