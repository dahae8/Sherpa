package com.ssafy.adrec.myPage.controller;

import com.ssafy.adrec.keyword.response.KeywordRes;
import com.ssafy.adrec.member.controller.MemberController;
import com.ssafy.adrec.myPage.response.KeywordRecRes;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mypage")
@CrossOrigin(origins = "*")
public class MyPageController {
    public static final Logger logger = LoggerFactory.getLogger(MemberController.class);

    @GetMapping("/keyword/{memberId}")
    public ResponseEntity<?> getKeywordRecList(@PathVariable("memberId") String memberId){
        List<KeywordRecRes> list = new ArrayList<>();

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus httpStatus = null;

        return new ResponseEntity<>(resultMap, httpStatus);
    }
}
