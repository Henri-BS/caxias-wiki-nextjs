package com.pasifcode.caxias_destiny.infra.repository;

import com.pasifcode.caxias_destiny.domain.entity.Story;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.util.StringUtils;

import java.util.List;

public interface StoryRepository extends JpaRepository<Story, String>, JpaSpecificationExecutor<Story> {
    default List<Story> findByNameOrLocationsOrTagsLike(String query) {
        Specification<Story> conjuction = (root, q, criteriaBuilder) -> criteriaBuilder.conjunction();
        Specification<Story> spec = Specification.where(conjuction);

        if (StringUtils.hasText(query)) {
            Specification<Story> nameLike = (root, q, cb) -> cb.like(cb.upper(root.get("name")), "%" + query.toUpperCase() + "%");
            Specification<Story> locationsLike = (root, q, cb) -> cb.like(cb.upper(root.get("locations")), "%" + query.toUpperCase() + "%");
            Specification<Story> tagsLike = (root, q, cb) -> cb.like(cb.upper(root.get("tags")), "%" + query.toUpperCase() + "%");

            Specification<Story> nameOrLocationsOrTagsLike = Specification.anyOf(nameLike, locationsLike, tagsLike);
            spec = spec.and(nameOrLocationsOrTagsLike);
        }
        return findAll(spec);
    }
}

