package com.pasifcode.caxiaswiki.service.impl;

import com.pasifcode.caxiaswiki.domain.entity.Wiki;
import com.pasifcode.caxiaswiki.infra.repository.WikiRepository;
import com.pasifcode.caxiaswiki.service.interf.WikiService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WikiServiceImpl implements WikiService {

    private final WikiRepository wikiRepository;

    @Override
    @Transactional
    public Wiki saveWiki(Wiki wiki) {
        return wikiRepository.save(wiki);
    }

    @Override
    public List<Wiki> searchWiki(String query){
        return wikiRepository.findByNameOrTagsLike(query);
    }

    @Override
    public Wiki findById(String id) {
        return wikiRepository.findById(id).orElseThrow();
    }




}
