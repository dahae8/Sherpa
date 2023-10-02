package com.ssafy.adrec.offline.outdoor.service;

import com.ssafy.adrec.member.service.MemberServiceImpl;
import com.ssafy.adrec.offline.outdoor.repository.BusRepository;
import com.ssafy.adrec.offline.outdoor.request.BusReq;
import com.ssafy.adrec.offline.outdoor.response.BusRes;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OutdoorServiceImpl implements OutdoorService {

    public static final Logger logger = LoggerFactory.getLogger(MemberServiceImpl.class);

    private final BusRepository busRepository;

    @Override
    public List<BusRes> getBusList(BusReq busReq){
        List<BusRes> list = new ArrayList<>();

        return list;
    }


}
