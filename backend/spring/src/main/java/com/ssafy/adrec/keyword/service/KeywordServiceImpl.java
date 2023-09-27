package com.ssafy.adrec.keyword.service;

import com.ssafy.adrec.area.service.AreaService;
import com.ssafy.adrec.keyword.repository.KeywordAdRepository;
import com.ssafy.adrec.keyword.repository.KeywordTrendRepository;
import com.ssafy.adrec.member.service.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KeywordServiceImpl implements KeywordService {
    public static final Logger logger = LoggerFactory.getLogger(MemberServiceImpl.class);

    private final KeywordAdRepository keywordAdRepository;
    private final KeywordTrendRepository keywordTrendRepository;
}
