package com.pasifcode.caxiaswiki.service.impl;

import com.pasifcode.caxiaswiki.domain.entity.Wiki;
import com.pasifcode.caxiaswiki.infra.repository.WikiRepository;
import com.pasifcode.caxiaswiki.service.interf.WikiService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class WikiServiceImpl implements WikiService {

    private final WikiRepository wikiRepository;


    @Override
    public Page<Wiki> searchWikis(Pageable pageable){
        return wikiRepository.findAll(pageable);
    }

    @Override
    public Wiki findById(String id) {
        return wikiRepository.findById(id).orElseThrow();
    }

    @Override
    @Transactional
    public Wiki saveWiki(Wiki wiki) {
        return wikiRepository.save(wiki);
    }

    @Override
    public Wiki updateWiki(String name, String description, String imageUrl, String id) {
        Wiki update = wikiRepository.findById(id).orElseThrow();
        update.setId(update.getId());
        update.setName(name);
        update.setDescription(description);
        update.setImageUrl(imageUrl);
        return wikiRepository.save(update);
    }
}
