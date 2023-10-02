package com.ssafy.adrec.myPage.service;

import com.ssafy.adrec.keyword.KeywordLike;
import com.ssafy.adrec.keyword.KeywordRec;
import com.ssafy.adrec.keyword.repository.KeywordLikeRepository;
import com.ssafy.adrec.keyword.repository.KeywordRecRepository;
import com.ssafy.adrec.member.Member;
import com.ssafy.adrec.member.repository.MemberRepository;
import com.ssafy.adrec.member.service.MemberServiceImpl;
import com.ssafy.adrec.myPage.request.MyPageModifyPutReq;
import com.ssafy.adrec.myPage.request.MyProductModifyPutReq;
import com.ssafy.adrec.myPage.response.KeywordIdKeyword;
import com.ssafy.adrec.myPage.response.KeywordRecRes;
import com.ssafy.adrec.product.ProductSmall;
import com.ssafy.adrec.product.repository.ProductSmallRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MyPageServiceImpl  implements MyPageService{

    private final KeywordRecRepository keywordRecRepository;
    private final KeywordLikeRepository keywordLikeRepository;
    private final MemberRepository memberRepository;
    private final ProductSmallRepository productSmallRepository;


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

    // 회원 정보 수정
    @Override
    public Member modifyMember(MyPageModifyPutReq myPageModifyPutReq) {
        Optional<Member> member = memberRepository.findByName(myPageModifyPutReq.getName());

        if (member.isPresent()) {
            Member modifyMember = member.get();

            modifyMember.setEmail(myPageModifyPutReq.getEmail());
            modifyMember.setPwd(myPageModifyPutReq.getPwd());

            return memberRepository.save(modifyMember);
        } else {
            return null;
        }
    }

    // 품목 정보 수정
    @Override
    public Member modifyProduct(MyProductModifyPutReq myProductModifyPutReq) {
        Optional<Member> member = memberRepository.findByName(myProductModifyPutReq.getName());

        if (member.isPresent()) {
            Member modifyProduct = member.get();

            ProductSmall modifyProductSmall = null;

            if (myProductModifyPutReq.getProductSmall_id() != null) {
                Optional<ProductSmall> productSmall = productSmallRepository.findById(myProductModifyPutReq.getProductSmall_id());
                if (productSmall.isPresent()) {
                    modifyProductSmall = productSmall.get();

                    modifyProduct.setProductSmall(modifyProductSmall);

                    Member saved = memberRepository.save(modifyProduct);

                    return saved;
                }
            }
        }
        return null;
    }
    
}
