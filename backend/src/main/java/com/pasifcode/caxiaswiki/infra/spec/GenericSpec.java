package com.pasifcode.caxiaswiki.infra.spec;

import org.springframework.data.jpa.domain.Specification;

public class GenericSpec {
    private GenericSpec(){}

    public static <T>Specification<T> conjuction(){
       return ((root, query, criteriaBuilder) -> criteriaBuilder.conjunction());
    }
}
