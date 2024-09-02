package com.pasifcode.caxias_destiny.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tb_story")
@EntityListeners(AuditingEntityListener.class)
public class Story {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "story_id")
    private String id;
    private String name;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String locations;
    private String tags;

}
