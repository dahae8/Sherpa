package com.ssafy.adrec.myPage.service;

import com.ssafy.adrec.keyword.KeywordLike;
import com.ssafy.adrec.keyword.KeywordRec;
import com.ssafy.adrec.member.Member;
import com.ssafy.adrec.myPage.request.MyPageModifyPutReq;
import com.ssafy.adrec.myPage.response.KeywordIdKeyword;
import com.ssafy.adrec.myPage.response.KeywordRecRes;

import java.util.List;

public interface MyPageService {

    List<KeywordRecRes> getKeywordRecList(Long memberId);

    void deleteKeywordRec(KeywordRec keywordRec);

    void deleteKeywordLike(KeywordLike keywordLike);

    List<KeywordIdKeyword> getKeywordIdKeywordList(Long keywordRecId);

    // 회원 정보 수정
    Member modifyMember(MyPageModifyPutReq myPageModifyPutReq);
}
