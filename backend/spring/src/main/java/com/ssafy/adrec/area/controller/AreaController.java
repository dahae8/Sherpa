package com.ssafy.adrec.area.controller;

import com.ssafy.adrec.area.service.AreaService;
import com.ssafy.adrec.member.controller.MemberController;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ares")
@CrossOrigin(origins = "*")
public class AreaController {
    public static final Logger logger = LoggerFactory.getLogger(MemberController.class);

    private final AreaService areaService;

    



}
