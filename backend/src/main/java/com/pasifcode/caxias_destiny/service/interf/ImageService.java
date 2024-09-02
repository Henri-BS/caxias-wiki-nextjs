package com.pasifcode.caxias_destiny.service.interf;

import com.pasifcode.caxias_destiny.domain.entity.Image;

import java.util.Optional;

public interface ImageService {
    Image saveImage(Image image);

    Optional<Image> getImage(String id);
}
