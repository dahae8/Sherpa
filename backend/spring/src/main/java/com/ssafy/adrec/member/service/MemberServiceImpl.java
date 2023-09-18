package com.ssafy.adrec.member.service;

import com.ssafy.adrec.member.Member;
import com.ssafy.adrec.member.controller.MemberController;
import com.ssafy.adrec.member.repository.MemberRepository;
import com.ssafy.adrec.member.request.MemberSignupPostReq;
import com.ssafy.adrec.product.ProductSmall;
import com.ssafy.adrec.product.repository.ProductSmallRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    public static final Logger logger = LoggerFactory.getLogger(MemberServiceImpl.class);

    private final MemberRepository memberRepository;
    private final ProductSmallRepository productSmallRepository;

    // 회원가입
    @Override
    public Member signup(MemberSignupPostReq memberSignupPostReq) {
        Optional<ProductSmall> productSmall = productSmallRepository.findById(memberSignupPostReq.getProductSmall_id());

        if (productSmall.isEmpty()) {
            return null;
        }

        Member member = Member.builder()
                .name(memberSignupPostReq.getName())
                .email(memberSignupPostReq.getEmail())
                .pwd(memberSignupPostReq.getPwd())
                .productSmall(productSmall.get())
                .build();

        Member saved = memberRepository.save(member);

        return saved;
    }
}
