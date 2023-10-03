package com.ssafy.adrec.content.repository;

import com.ssafy.adrec.content.ContentRec;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContentRecRepository extends JpaRepository<ContentRec, Long>   {

    List<ContentRec> findAllByMember_Id(Long id);
}
