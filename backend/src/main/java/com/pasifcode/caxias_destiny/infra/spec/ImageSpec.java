package com.pasifcode.caxias_destiny.infra.spec;

import com.pasifcode.caxias_destiny.domain.entity.Image;
import com.pasifcode.caxias_destiny.domain.enums.ImageExtension;
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
