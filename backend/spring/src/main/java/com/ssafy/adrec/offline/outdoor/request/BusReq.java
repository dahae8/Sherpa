package com.ssafy.adrec.offline.outdoor.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BusReq {
    int gender;
    int age;
    Long sigunguId;

    @Builder
    public BusReq(int gender, int age, Long sigunguId) {
        this.gender = gender;
        this.age = age;
        this.sigunguId = sigunguId;
    }
}
