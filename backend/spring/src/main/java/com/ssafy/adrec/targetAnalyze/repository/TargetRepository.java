package com.ssafy.adrec.targetAnalyze.repository;

import com.ssafy.adrec.targetAnalyze.Target;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TargetRepository extends JpaRepository<Target, Long> {
    List<Target> findAll();
}
