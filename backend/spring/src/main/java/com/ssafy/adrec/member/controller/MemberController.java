package com.ssafy.adrec.member.controller;

import com.ssafy.adrec.member.Member;
import com.ssafy.adrec.member.request.MemberSignupPostReq;
import com.ssafy.adrec.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
@CrossOrigin(origins = "*")
public class MemberController {

    public static final Logger logger = LoggerFactory.getLogger(MemberController.class);

    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<?> signup(@RequestBody MemberSignupPostReq memberSignupPostReq) {
        Member member = memberService.signup(memberSignupPostReq);

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus httpStatus = null;

        if (member == null) {
            resultMap.put("success", false);
            resultMap.put("msg", "회원가입 실패");
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        } else {
            resultMap.put("success", true);
            resultMap.put("msg", "회원가입 성공");
            httpStatus = HttpStatus.OK;
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, httpStatus);
    }
}
