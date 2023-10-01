package com.ssafy.adrec.targetAnalyze.service;

import com.ssafy.adrec.member.service.MemberServiceImpl;
import com.ssafy.adrec.targetAnalyze.Target;
import com.ssafy.adrec.targetAnalyze.repository.TargetRepository;
import com.ssafy.adrec.targetAnalyze.response.TargetAgeGetRes;
import com.ssafy.adrec.targetAnalyze.response.TargetGenderGetRes;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TargetServiceImpl implements TargetService{

    public static final Logger logger = LoggerFactory.getLogger(MemberServiceImpl.class);

    private final TargetRepository targetRepository;

    @Override
    public List<TargetGenderGetRes> getTargetGenderList(){
        List<TargetGenderGetRes> list = new ArrayList<>();

        // 1. sigungu_id 받으면 → dong_id값으로 그룹지어줌
        // 1-1. sigungu_id 있음
        // 1-2. sigungu_id 없음
        // 2. productSmall_id가 없으면?
        // 3. productSmall_id와 sigungu_id 둘 다 넣어서 gender 0일때, 1일때 값 퍼센트로 가져옴
        List<Target> targetList = targetRepository.findAll();
        for (Target target : targetList){
            String gender = "0";
            String value = "45";
            list.add(new TargetGenderGetRes(gender, value));
        }

        return list;
    }

    @Override
    public List<TargetAgeGetRes> getTargetAgeList(){
        List<TargetAgeGetRes> list = new ArrayList<>();


        return list;
    }
}
