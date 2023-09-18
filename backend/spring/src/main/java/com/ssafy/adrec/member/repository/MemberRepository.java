package com.ssafy.adrec.member.repository;

import com.ssafy.adrec.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

}
