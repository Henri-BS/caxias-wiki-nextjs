package com.pasifcode.caxiaswiki.service.interf;

import com.pasifcode.caxiaswiki.domain.entity.Wiki;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface WikiService {
    Wiki saveWiki(Wiki wiki);

    Page<Wiki> searchWikis(Pageable pageable);

    Wiki findById(String id);

}
