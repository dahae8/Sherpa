package com.ssafy.adrec.offline.outdoor.response;

import lombok.Getter;

@Getter
public class BusRes {
    String type;
    float ratio;

    public BusRes(String type, float ratio) {
        this.type = type;
        this.ratio = ratio;
    }
}
