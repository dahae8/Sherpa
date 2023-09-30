package com.ssafy.adrec.myPage.service;

import com.ssafy.adrec.keyword.KeywordLike;
import com.ssafy.adrec.keyword.KeywordRec;
import com.ssafy.adrec.keyword.repository.KeywordLikeRepository;
import com.ssafy.adrec.keyword.repository.KeywordRecRepository;
import com.ssafy.adrec.member.service.MemberServiceImpl;
import com.ssafy.adrec.myPage.response.KeywordIdKeyword;
import com.ssafy.adrec.myPage.response.KeywordRecRes;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MyPageServiceImpl  implements MyPageService{

    private final KeywordRecRepository keywordRecRepository;
    private final KeywordLikeRepository keywordLikeRepository;


    @Override
    public List<KeywordRecRes> getKeywordRecList(Long memberId){
        System.out.println(memberId);
        List<KeywordRecRes> list = new ArrayList<>();

        List<KeywordRec> keywordRecList = keywordRecRepository.findAllBymember_Id(memberId);


        for (KeywordRec keywordRec : keywordRecList){
            List<KeywordIdKeyword> keywordIdKeywordList = getKeywordIdKeywordList(keywordRec.getId());

            KeywordRecRes keywordRecRes = KeywordRecRes.builder()
                    .id(keywordRec.getId())
                    .recDate(keywordRec.getRecDate())
                    .productSmall(keywordRec.getProductSmall().getSmall())
                    .keywordList(keywordIdKeywordList)
                    .build();

            list.add(keywordRecRes);
        }

        return list;
    }



    @Override
    public void deleteKeywordLike(KeywordLike keywordLike){
        keywordLikeRepository.delete(keywordLike);
    }

    @Override
    public void deleteKeywordRec(KeywordRec keywordRec){
        List<KeywordLike> keywordLikeList = keywordLikeRepository.findAllByKeywordRecId(keywordRec.getId());
        for (KeywordLike keywordLike : keywordLikeList){
            deleteKeywordLike(keywordLike);
        }

        keywordRecRepository.delete(keywordRec);
    }

    @Override
    public List<KeywordIdKeyword> getKeywordIdKeywordList(Long keywordRecId){
        List<KeywordIdKeyword> list = new ArrayList<>();

        List<KeywordLike> keywordLikeList = keywordLikeRepository.findAllByKeywordRecId(keywordRecId);

        for (KeywordLike keywordLike : keywordLikeList){

            KeywordIdKeyword keywordIdKeyword = KeywordIdKeyword.builder()
                    .id(keywordLike.getId())
                    .keyword(keywordLike.getKeyword())
                    .build();

            list.add(keywordIdKeyword);
        }
        return list;

    }

}
