package com.ssafy.adrec.myPage.service;

import com.ssafy.adrec.area.Sigungu;
import com.ssafy.adrec.content.ContentKeyword;
import com.ssafy.adrec.content.ContentRec;
import com.ssafy.adrec.content.repository.ContentKeywordRepository;
import com.ssafy.adrec.content.repository.ContentLikeRepository;
import com.ssafy.adrec.content.repository.ContentRecRepository;
import com.ssafy.adrec.keyword.KeywordLike;
import com.ssafy.adrec.keyword.KeywordRec;
import com.ssafy.adrec.keyword.repository.KeywordLikeRepository;
import com.ssafy.adrec.keyword.repository.KeywordRecRepository;
import com.ssafy.adrec.media.MediaSub;
import com.ssafy.adrec.media.MediaType;
import com.ssafy.adrec.media.repository.MediaSubRepository;
import com.ssafy.adrec.media.repository.MediaTypeRepository;
import com.ssafy.adrec.member.Member;
import com.ssafy.adrec.member.repository.MemberRepository;
import com.ssafy.adrec.member.service.MemberServiceImpl;
import com.ssafy.adrec.myPage.MediaRec;
import com.ssafy.adrec.myPage.repository.MediaRecRepository;
import com.ssafy.adrec.myPage.request.MediaRecReq;
import com.ssafy.adrec.myPage.request.MyPageModifyPutReq;
import com.ssafy.adrec.myPage.request.MyProductModifyPutReq;
import com.ssafy.adrec.myPage.response.*;
import com.ssafy.adrec.product.ProductSmall;
import com.ssafy.adrec.product.repository.ProductSmallRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private final MediaRecRepository mediaRecRepository;
    private final MediaTypeRepository mediaTypeRepository;
    private final MediaSubRepository mediaSubRepository;
    private final ContentRecRepository contentRecRepository;
    private final ContentKeywordRepository contentKeywordRepository;
    private final ContentLikeRepository contentLikeRepository;

    @Override
    public List<KeywordRecRes> getKeywordRecList(Long memberId){
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

    @Override
    public MediaRec saveMediaRec(MediaRecReq mediaRecReq, ProductSmall productSmall, Sigungu sigungu, Member member, MediaType mediaType){
        MediaRec mediaRec = MediaRec.builder()
                .budget(mediaRecReq.getBudget())
                .recDate(LocalDateTime.now())
                .sigungu(sigungu)
                .isOnOff(mediaRecReq.getInOnOff())
                .member(member)
                .productSmall(productSmall)
                .mediaType(mediaType)
                .build();
        return mediaRecRepository.save(mediaRec);
    }

    @Override
    public List<MediaRecRes> getMediaRecList(Long id){
        List<MediaRecRes> list = new ArrayList<>();
        List<MediaRec> mediaRecList = mediaRecRepository.findAllByMember_Id(id);
        for(MediaRec mediaRec: mediaRecList){
            MediaRecRes mediaRecRes = MediaRecRes.builder()
                    .id(mediaRec.getId())
                    .recDate(mediaRec.getRecDate())
                    .isOnOff(mediaRec.getIsOnOff())
                    .budget(mediaRec.getBudget())
                    .sigungu(mediaRec.getSigungu().getName())
                    .productSmall(mediaRec.getProductSmall().getSmall())
                    .mediaTypeId(mediaRec.getMediaType().getId())
                    .build();
            list.add(mediaRecRes);
        }
        return list;
    }

    @Override
    public MediaRec getMediaRec(Long id){

        Optional<MediaRec> OpMediaRec = mediaRecRepository.findById(id);
        if(OpMediaRec.isEmpty()) return null;

        return OpMediaRec.get();

    }

    @Override
    public void deleteMediaRec(MediaRec mediaRec){
        mediaRecRepository.delete(mediaRec);

    }

    @Override
    public MediaType getMediaType(Long id){
        Optional<MediaType> mediaType = mediaTypeRepository.findById(id);
        if(mediaType.isEmpty()) return null;

        return mediaType.get();
    }
    @Override
    public MediaSub getMediaSub(Long id){
        Optional<MediaSub> mediaSub = mediaSubRepository.findById(id);
        if(mediaSub.isEmpty()) return null;

        return mediaSub.get();

    }

    @Override
    public List<String> getKeywordList(Member member, ProductSmall productSmall){
        List<String> list = new ArrayList<>();

        List<KeywordRec> keywordRecList = keywordRecRepository.findAllByMember_IdAndProductSmallId(member.getId(), productSmall.getId());


        for (KeywordRec keywordRec : keywordRecList){
            List<KeywordIdKeyword> keywordIdKeywordList = getKeywordIdKeywordList(keywordRec.getId());

            for(KeywordIdKeyword keywordIdKeyword: keywordIdKeywordList){
                list.add(keywordIdKeyword.getKeyword());
            }

        }

        return list;
    }


    @Override
    public List<ContentRecRes> getContentRecList(Long id) {

        List<ContentRecRes> list = new ArrayList<>();
        List<ContentRec> contentRecList = contentRecRepository.findAllByMember_Id(id);
        for(ContentRec contentRec: contentRecList){

            List<ContentKeywordRes> keywordList = new ArrayList<>();
            List<ContentKeyword> contentKeywordResList = contentKeywordRepository.findAllByContentRec_Id(contentRec.getId());
            for (ContentKeyword contentKeyword: contentKeywordResList){
                ContentKeywordRes contentKeywordRes = ContentKeywordRes.builder()
                        .id(contentKeyword.getId())
                        .keyword(contentKeyword.getKeyword())
                        .build();

                keywordList.add(contentKeywordRes);
            }

            ContentRecRes contentRecRes = ContentRecRes.builder()
                    .id(contentRec.getId())
                    .recDate(contentRec.getRecDate())
                    .productSmallId(contentRec.getProductSmall().getId())
                    .mediaTypeId(contentRec.getMediaType().getId())
                    .keywordList(keywordList)
                    .build();

            list.add(contentRecRes);
        }

        return list;
    }

}
