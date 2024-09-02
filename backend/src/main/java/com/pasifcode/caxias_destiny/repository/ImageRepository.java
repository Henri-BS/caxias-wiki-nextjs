package com.pasifcode.caxias_destiny.repository;

import com.pasifcode.caxias_destiny.domain.entity.Image;
import com.pasifcode.caxias_destiny.domain.enums.ImageExtension;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.util.StringUtils;

import java.util.List;


public interface ImageRepository extends JpaRepository<Image, String>, JpaSpecificationExecutor<Image> {

    default List<Image> findByExtensionAndNameOrFontLike(ImageExtension extension, String query){
        Specification<Image> conjuction = (root, q, criteriaBuilder) -> criteriaBuilder.conjunction();
        Specification<Image> spec = Specification.where(conjuction);

        if(extension != null){
            Specification<Image> extensionEqual = (root, q, cb ) ->
                    cb.equal(root.get("extension"), extension);
           spec = spec.and(extensionEqual);
        }

        if (StringUtils.hasText(query)) {
            Specification<Image> nameLike = (root, q, cb) -> cb.like(cb.upper(root.get("name")), "%" + query.toUpperCase() + "%");
            Specification<Image> fontLike = (root, q, cb) -> cb.like(cb.upper(root.get("font")), "%" + query.toUpperCase() + "%");


            Specification<Image> nameOrFontLike = Specification.anyOf(nameLike, fontLike);
            spec = spec.and(nameOrFontLike);
        }
        return findAll(spec);
    }

}
