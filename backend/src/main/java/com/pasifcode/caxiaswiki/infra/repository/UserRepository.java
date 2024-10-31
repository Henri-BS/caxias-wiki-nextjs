package com.pasifcode.caxiaswiki.infra.repository;

import com.pasifcode.caxiaswiki.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    User findByEmail(String email);
}
