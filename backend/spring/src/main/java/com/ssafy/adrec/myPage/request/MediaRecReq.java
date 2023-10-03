package com.ssafy.adrec.myPage.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MediaRecReq {
    String memberName;
    Long productSmallId;
    int budget;
    int inOnOff;
    Long sigunguId;

    @Builder
    public MediaRecReq(String memberName, Long productSmallId, int budget, int inOnOff, Long sigunguId) {
        this.memberName = memberName;
        this.productSmallId = productSmallId;
        this.budget = budget;
        this.inOnOff = inOnOff;
        this.sigunguId = sigunguId;
    }
}
