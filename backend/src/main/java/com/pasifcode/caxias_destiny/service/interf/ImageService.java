package com.pasifcode.caxias_destiny.service.interf;

import com.pasifcode.caxias_destiny.domain.entity.Image;
import com.pasifcode.caxias_destiny.domain.enums.ImageExtension;

import java.util.List;
import java.util.Optional;

public interface ImageService {
    Image saveImage(Image image);

    List<Image> searchImage(ImageExtension extension, String query);

    Optional<Image> getImage(String id);
}
