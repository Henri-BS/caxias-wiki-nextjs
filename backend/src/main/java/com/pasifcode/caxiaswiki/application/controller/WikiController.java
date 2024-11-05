package com.pasifcode.caxiaswiki.application.controller;

import com.pasifcode.caxiaswiki.application.mapper.WikiMapper;
import com.pasifcode.caxiaswiki.domain.dto.WikiDto;
import com.pasifcode.caxiaswiki.domain.entity.Wiki;
import com.pasifcode.caxiaswiki.service.interf.WikiService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/v1/wikis")
@RequiredArgsConstructor
public class WikiController {

    private final WikiService wikiService;
    private final WikiMapper wikiMapper;

    @GetMapping("/{id}")
    public ResponseEntity<WikiDto> findWikiById(@PathVariable String id) {
        var wiki = wikiService.findById(id);
        var dto = wikiMapper.wikiToDto(wiki);
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<Page<WikiDto>> searchWikis(
            @RequestParam(required = false, defaultValue = "") String query,
            Pageable pageable) {
        var result = wikiService.searchWikis( pageable);
        var wikis = result.map(wikiMapper::wikiToDto);
        return ResponseEntity.ok(wikis);
    }

    @PostMapping
    public ResponseEntity saveWiki(
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam String imageUrl,
            @RequestParam List<String> tags
    ) throws IOException {
        Wiki wiki = wikiMapper.mapToWiki(name, description, imageUrl, tags);
        wikiService.saveWiki(wiki);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/update")
    public ResponseEntity<WikiDto> updateWiki(
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam String imageUrl,
            @RequestParam String id) {
        Wiki updateWiki = wikiService.updateWiki(name, description, imageUrl, id);
        WikiDto dto = wikiMapper.wikiToDto(updateWiki);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}