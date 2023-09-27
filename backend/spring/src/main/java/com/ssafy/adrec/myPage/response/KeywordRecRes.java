package com.ssafy.adrec.myPage.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class KeywordRecRes {

    LocalDateTime recDate;
    String productSmall;
    List<String> keywordList;

    @Builder

    public KeywordRecRes(LocalDateTime recDate, String productSmall, List<String> keywordList) {
        this.recDate = recDate;
        this.productSmall = productSmall;
        this.keywordList = keywordList;
    }
}
