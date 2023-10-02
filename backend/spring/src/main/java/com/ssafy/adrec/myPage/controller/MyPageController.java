package com.ssafy.adrec.myPage.controller;

import com.ssafy.adrec.keyword.KeywordLike;
import com.ssafy.adrec.keyword.KeywordRec;
import com.ssafy.adrec.keyword.service.KeywordService;
import com.ssafy.adrec.member.Member;
import com.ssafy.adrec.member.controller.MemberController;
import com.ssafy.adrec.member.service.MemberService;
import com.ssafy.adrec.myPage.response.KeywordIdKeyword;
import com.ssafy.adrec.myPage.response.KeywordRecRes;
import com.ssafy.adrec.myPage.service.MyPageService;
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

    private final MyPageService myPageService;
    private final MemberService memberService;
    private final KeywordService keywordService;

    @GetMapping("/keyword/{memberName}")
    public ResponseEntity<?> getKeywordRecList(@PathVariable("memberName") String memberName){
        List<KeywordRecRes> list = new ArrayList<>();

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus httpStatus = null;
        resultMap.put("msg", "좋아요한 키워드 목록 조회");

        Member member = memberService.checkName(memberName);
        if (member == null) {
            resultMap.put("success", false);
            resultMap.put("msg", String.format("[%s]은/는 회원가입된 유저ID가 아닙니다.",memberName));
            httpStatus = HttpStatus.NOT_FOUND;
            return new ResponseEntity<Map<String, Object>>(resultMap, httpStatus);
        }

        list = myPageService.getKeywordRecList(member.getId());
        resultMap.put("success", true);
        resultMap.put("data", list);
        resultMap.put("count", list.size());
        httpStatus = HttpStatus.OK;

        return new ResponseEntity<>(resultMap, httpStatus);
    }

    @GetMapping("/keyword/rec/{memberName}/{keywordRecId}")
    public ResponseEntity<?> getKeywordRec(@PathVariable("memberName") String memberName, @PathVariable("keywordRecId") Long keywordRecId) {

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus httpStatus = null;
        resultMap.put("msg", "좋아요한 키워드 목록 상세 보기 ");

        Member member = memberService.checkName(memberName);
        if (member == null) {
            resultMap.put("success", false);
            resultMap.put("msg", String.format("[%s]은/는 회원가입된 유저ID가 아닙니다.", memberName));
            httpStatus = HttpStatus.NOT_FOUND;
            return new ResponseEntity<Map<String, Object>>(resultMap, httpStatus);
        }

        KeywordRec keywordRec = keywordService.getKeywordRec(keywordRecId);
        if (keywordRec == null) {
            resultMap.put("success", false);
            resultMap.put("msg", String.format("[%d]은/는 유효하지 않는 보관함ID입니다.",keywordRecId));
            httpStatus = HttpStatus.NOT_FOUND;
            return new ResponseEntity<Map<String, Object>>(resultMap, httpStatus);
        }

        List<KeywordIdKeyword> keywordIdKeywordList = myPageService.getKeywordIdKeywordList(keywordRecId);

        KeywordRecRes keywordRecRes = KeywordRecRes.builder()
                .id(keywordRec.getId())
                .recDate(keywordRec.getRecDate())
                .productSmall(keywordRec.getProductSmall().getSmall())
                .keywordList(keywordIdKeywordList)
                .build();

        resultMap.put("success", true);
        resultMap.put("data", keywordRecRes);
        resultMap.put("count", 1);
        httpStatus = HttpStatus.OK;

        return new ResponseEntity<>(resultMap, httpStatus);

    }


    @DeleteMapping("/keyword/like/{memberName}/{keywordLikeId}")
    public ResponseEntity<?> deleteKeywordLike(@PathVariable("memberName") String memberName, @PathVariable("keywordLikeId") Long keywordLikeId) {

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus httpStatus = null;
        resultMap.put("msg", "좋아요한 키워드 삭제");


        Member member = memberService.checkName(memberName);
        if (member == null) {
            resultMap.put("success", false);
            resultMap.put("msg", String.format("[%s]은/는 회원가입된 유저ID가 아닙니다.", memberName));
            httpStatus = HttpStatus.NOT_FOUND;
            return new ResponseEntity<Map<String, Object>>(resultMap, httpStatus);
        }


        KeywordLike keywordLike = keywordService.getKeywordLike(keywordLikeId);
        if (keywordLike == null) {
            resultMap.put("success", false);
            resultMap.put("msg", String.format("[%d]은/는 유효하지 않는 좋아요 키워드ID입니다.",keywordLikeId));
            httpStatus = HttpStatus.NOT_FOUND;
            return new ResponseEntity<Map<String, Object>>(resultMap, httpStatus);
        }

        myPageService.deleteKeywordLike(keywordLike);

        resultMap.put("success", true);
        resultMap.put("data", String.format("[%s]키워드를 삭제하였습니다.",keywordLike.getKeyword()));
        resultMap.put("count", 1);
        httpStatus = HttpStatus.OK;

        return new ResponseEntity<>(resultMap, httpStatus);

    }

    @DeleteMapping("/keyword/rec/{memberName}/{keywordRecId}")
    public ResponseEntity<?> deleteKeywordRec(@PathVariable("memberName") String memberName, @PathVariable("keywordRecId") Long keywordRecId) {

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus httpStatus = null;
        resultMap.put("msg", "좋아요한 키워드 목록 삭제");


        Member member = memberService.checkName(memberName);
        if (member == null) {
            resultMap.put("success", false);
            resultMap.put("msg", String.format("[%s]은/는 회원가입된 유저ID가 아닙니다.", memberName));
            httpStatus = HttpStatus.NOT_FOUND;
            return new ResponseEntity<Map<String, Object>>(resultMap, httpStatus);
        }


        KeywordRec keywordRec = keywordService.getKeywordRec(keywordRecId);
        if (keywordRec == null) {
            resultMap.put("success", false);
            resultMap.put("msg", String.format("[%d]은/는 유효하지 않는 보관함ID입니다.",keywordRecId));
            httpStatus = HttpStatus.NOT_FOUND;
            return new ResponseEntity<Map<String, Object>>(resultMap, httpStatus);
        }

        myPageService.deleteKeywordRec(keywordRec);

        resultMap.put("success", true);
        resultMap.put("data", String.format("[%d]보관함을 삭제하였습니다.",keywordRecId));
        resultMap.put("count", 1);
        httpStatus = HttpStatus.OK;

        return new ResponseEntity<>(resultMap, httpStatus);

    }

    @GetMapping("/profile/{name}")
    public ResponseEntity<?> getMemberInfo(@PathVariable("name") String name) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus httpStatus = null;

        Member member = memberService.checkName(name);

        if (member == null) {
            resultMap.put("success", false);
            resultMap.put("msg", "해당 계정의 정보가 존재하지 않습니다.");
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        } else {
            resultMap.put("data", member);
            resultMap.put("success", true);
            resultMap.put("msg", "회원 정보 조회 성공");
            httpStatus = HttpStatus.OK;
        }

        return new ResponseEntity<>(resultMap, httpStatus);
    }

}
