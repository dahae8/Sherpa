package com.ssafy.adrec.offline.outdoor.service;

import com.ssafy.adrec.offline.outdoor.request.TargetReq;
import com.ssafy.adrec.offline.outdoor.response.OutdoorRes;

import java.util.List;

public interface OutdoorService {
    List<OutdoorRes> getAreaList(TargetReq areaReq);
    List<OutdoorRes> getBusList(TargetReq targetReq);

    boolean isGwangju(Long sigunguId);
}
