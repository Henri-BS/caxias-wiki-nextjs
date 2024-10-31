package com.pasifcode.caxiaswiki.infra.spec;

import com.pasifcode.caxiaswiki.domain.entity.Image;
import com.pasifcode.caxiaswiki.domain.enums.ImageExtension;
import org.springframework.data.jpa.domain.Specification;

public class ImageSpec {
private ImageSpec(){}

    public static Specification<Image> extensionEquals(ImageExtension extension){
    return (root, q, cb) -> cb.equal(root.get("extension"), extension);
    }

    public static Specification<Image> nameLike(String name) {
        return (root, q, cb) -> cb.like(cb.upper(root.get("name")), "%" + name.toUpperCase() + "%");
    }
}
