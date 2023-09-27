package com.ssafy.adrec.offline.outdoor.service;

import com.ssafy.adrec.offline.outdoor.response.BusRes;

import java.util.List;

public interface OutdoorService {
    List<BusRes> getBusList(int gender, int age, String area);
}
