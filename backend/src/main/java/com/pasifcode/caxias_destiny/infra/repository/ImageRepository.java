package com.pasifcode.caxias_destiny.infra.repository;

import com.pasifcode.caxias_destiny.domain.entity.Image;
import com.pasifcode.caxias_destiny.domain.enums.ImageExtension;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.util.StringUtils;

import java.util.List;

import static com.pasifcode.caxias_destiny.infra.spec.GenericSpec.*;
import static com.pasifcode.caxias_destiny.infra.spec.ImageSpec.*;
import static org.springframework.data.jpa.domain.Specification.where;


public interface ImageRepository extends JpaRepository<Image, String>, JpaSpecificationExecutor<Image> {

    default List<Image> findByExtensionAndNameLike(ImageExtension extension, String query){
        Specification<Image> spec = where(conjuction());

        if(extension != null){
           spec = spec.and(extensionEquals(extension));
        }

        if (StringUtils.hasText(query)) {
            spec = spec.and(Specification.anyOf(nameLike(query)));
        }
        return findAll(spec);
    }

}
