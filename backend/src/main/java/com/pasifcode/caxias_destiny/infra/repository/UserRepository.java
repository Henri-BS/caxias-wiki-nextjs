package com.pasifcode.caxias_destiny.infra.repository;

import com.pasifcode.caxias_destiny.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    User findByEmail(String email);
}
