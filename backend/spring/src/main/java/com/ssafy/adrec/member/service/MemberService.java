package com.ssafy.adrec.member.service;

import com.ssafy.adrec.member.Member;
import com.ssafy.adrec.member.request.MemberLoginPostReq;
import com.ssafy.adrec.member.request.MemberSignupPostReq;

public interface MemberService {

    // 회원가입
    Member signup(MemberSignupPostReq memberSignupPostReq);

    // 로그인
    Member login(MemberLoginPostReq memberLoginPostReq);

}
