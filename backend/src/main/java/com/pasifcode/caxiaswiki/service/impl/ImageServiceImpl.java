package com.pasifcode.caxiaswiki.service.impl;

import com.pasifcode.caxiaswiki.domain.entity.Image;
import com.pasifcode.caxiaswiki.domain.entity.Wiki;
import com.pasifcode.caxiaswiki.infra.repository.ImageRepository;
import com.pasifcode.caxiaswiki.service.interf.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    @Transactional
    public Page<Image> searchImage(Wiki wiki, Pageable pageable){
        return imageRepository.findByWiki(wiki, pageable);
    }

    @Override
    public Optional<Image> getImage(String id){
        return imageRepository.findById(id);
    }
}
