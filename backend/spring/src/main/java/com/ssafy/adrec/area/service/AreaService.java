package com.ssafy.adrec.area.service;

import com.ssafy.adrec.area.AreaType;
import com.ssafy.adrec.area.response.AreaGetRes;

import java.util.List;

public interface AreaService {
    List<AreaGetRes> getList(AreaType areaType, Long id);
}
