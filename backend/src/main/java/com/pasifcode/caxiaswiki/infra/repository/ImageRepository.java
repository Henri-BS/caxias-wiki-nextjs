package com.pasifcode.caxiaswiki.infra.repository;

import com.pasifcode.caxiaswiki.domain.entity.Image;
import com.pasifcode.caxiaswiki.domain.entity.Wiki;
import com.pasifcode.caxiaswiki.domain.enums.ImageExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.util.StringUtils;

import java.util.List;

import static com.pasifcode.caxiaswiki.infra.spec.GenericSpec.*;
import static com.pasifcode.caxiaswiki.infra.spec.ImageSpec.*;
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

    Page<Image> findByWiki(Wiki wiki, Pageable pageable);
}
