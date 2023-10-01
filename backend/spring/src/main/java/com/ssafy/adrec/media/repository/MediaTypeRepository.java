package com.ssafy.adrec.media.repository;

import com.ssafy.adrec.media.MediaType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MediaTypeRepository extends JpaRepository<MediaType, Long> {
    List<MediaType> findAll();
}
