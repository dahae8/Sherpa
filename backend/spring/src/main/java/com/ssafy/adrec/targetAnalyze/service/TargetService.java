package com.ssafy.adrec.targetAnalyze.service;

import com.ssafy.adrec.targetAnalyze.response.TargetAgeGetRes;
import com.ssafy.adrec.targetAnalyze.response.TargetGenderGetRes;

import java.util.List;

public interface TargetService {
    List<TargetGenderGetRes> getTargetGenderList();

    List<TargetAgeGetRes> getTargetAgeList();
}
