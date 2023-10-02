package com.ssafy.adrec.offline.controller;

import com.ssafy.adrec.offline.outdoor.request.BusReq;
import com.ssafy.adrec.offline.outdoor.service.OutdoorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/offline")
@CrossOrigin(origins = "*")
public class OfflineController {
    private final OutdoorService outdoorService;

    @PostMapping("/outdoor/bus")
    public ResponseEntity<?> getBusList(@RequestBody BusReq busReq){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus httpStatus = null;


        return new ResponseEntity<Map<String, Object>>(resultMap, httpStatus);
    }
}
