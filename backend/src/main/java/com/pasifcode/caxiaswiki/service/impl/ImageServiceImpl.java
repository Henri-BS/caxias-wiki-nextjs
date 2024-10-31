package com.pasifcode.caxiaswiki.service.impl;

import com.pasifcode.caxiaswiki.domain.entity.Image;
import com.pasifcode.caxiaswiki.domain.enums.ImageExtension;
import com.pasifcode.caxiaswiki.infra.repository.ImageRepository;
import com.pasifcode.caxiaswiki.service.interf.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;

    @Override
    @Transactional
    public Image saveImage(Image image) {
        return imageRepository.save(image);
    }

    @Override
    public List<Image> searchImage(ImageExtension extension, String query){
        return imageRepository.findByExtensionAndNameLike(extension, query);
    }

    @Override
    public Optional<Image> getImage(String id){
        return imageRepository.findById(id);
    }
}
