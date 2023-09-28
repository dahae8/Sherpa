package com.ssafy.adrec.keyword.repository;

import com.ssafy.adrec.keyword.KeywordRec;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface KeywordRecRepository  extends JpaRepository<KeywordRec, Long> {

    Optional<KeywordRec> findById(Long keywordRecId);

}
