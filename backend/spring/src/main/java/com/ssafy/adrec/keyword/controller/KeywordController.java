package com.ssafy.adrec.keyword.controller;

import com.ssafy.adrec.keyword.service.KeywordService;
import com.ssafy.adrec.member.controller.MemberController;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/keyword")
@CrossOrigin(origins = "*")
public class KeywordController {

    public static final Logger logger = LoggerFactory.getLogger(MemberController.class);

    private final KeywordService keywordService;
}
