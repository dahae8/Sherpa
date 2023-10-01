package com.ssafy.adrec.targetAnalyze.controller;

import com.ssafy.adrec.member.controller.MemberController;
import com.ssafy.adrec.targetAnalyze.request.TargetReq;
import com.ssafy.adrec.targetAnalyze.service.TargetService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/target")
@CrossOrigin(origins = "*")
public class TargetController {

    public static final Logger logger = LoggerFactory.getLogger(MemberController.class);

    private final TargetService targetService;

    @PostMapping
    public ResponseEntity<?> target(@RequestBody TargetReq targetReq) {


        return null;
    }

}