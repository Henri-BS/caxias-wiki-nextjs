package com.pasifcode.caxiaswiki.service.interf;

import com.pasifcode.caxiaswiki.domain.entity.Wiki;

import java.util.List;

public interface WikiService {
    Wiki saveWiki(Wiki wiki);

    List<Wiki> searchWiki(String query);

    Wiki findById(String id);

}
