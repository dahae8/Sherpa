package com.ssafy.adrec.offline.outdoor.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class AreaReq{
    int listSize;
    int gender;
    int age;
    Long sigunguId;

    @Builder
    public AreaReq(int gender, int age, Long sigunguId, int listSize) {
        this.gender = gender;
        this.age = age;
        this.sigunguId = sigunguId;
        this.listSize = listSize;
    }

}
