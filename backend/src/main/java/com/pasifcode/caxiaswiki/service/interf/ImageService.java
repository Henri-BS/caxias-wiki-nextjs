package com.pasifcode.caxiaswiki.service.interf;

import com.pasifcode.caxiaswiki.domain.entity.Image;
import com.pasifcode.caxiaswiki.domain.entity.Wiki;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ImageService {
    Image saveImage(Image image);

    Page<Image> searchImage(Wiki wikiId, Pageable pageable);

    Optional<Image> getImage(String id);
}
