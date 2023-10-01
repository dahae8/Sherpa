package com.ssafy.adrec.media.service;

import com.ssafy.adrec.media.MediaTypes;
import com.ssafy.adrec.media.response.MediaSubGetRes;
import com.ssafy.adrec.media.response.MediaTypeGetRes;

import java.util.List;

public interface MediaService {

    List<MediaTypeGetRes> getMediaTypeList(MediaTypes mediaTypes, Long id);

    List<MediaSubGetRes> getMediaSubList(MediaTypes mediaTypes, Long id);
}
