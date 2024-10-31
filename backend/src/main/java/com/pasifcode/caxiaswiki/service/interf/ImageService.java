package com.pasifcode.caxiaswiki.service.interf;

import com.pasifcode.caxiaswiki.domain.entity.Image;
import com.pasifcode.caxiaswiki.domain.enums.ImageExtension;

import java.util.List;
import java.util.Optional;

public interface ImageService {
    Image saveImage(Image image);

    List<Image> searchImage(ImageExtension extension, String query);

    Optional<Image> getImage(String id);
}
