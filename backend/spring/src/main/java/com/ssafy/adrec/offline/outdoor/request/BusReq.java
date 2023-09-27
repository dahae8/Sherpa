package com.ssafy.adrec.offline.outdoor.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BusReq {
    int gender;
    int age;
    String Area;

    @Builder
    public BusReq(int gender, int age, String area) {
        this.gender = gender;
        this.age = age;
        Area = area;
    }
}
