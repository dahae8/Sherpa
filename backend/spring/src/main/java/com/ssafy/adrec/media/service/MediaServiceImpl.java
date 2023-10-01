package com.ssafy.adrec.media.service;

import com.ssafy.adrec.media.MediaSub;
import com.ssafy.adrec.media.MediaType;
import com.ssafy.adrec.media.MediaTypes;
import com.ssafy.adrec.media.repository.MediaSubRepository;
import com.ssafy.adrec.media.repository.MediaTypeRepository;
import com.ssafy.adrec.media.response.MediaSubGetRes;
import com.ssafy.adrec.media.response.MediaTypeGetRes;
import com.ssafy.adrec.member.service.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class MediaServiceImpl implements MediaService{
    public static final Logger logger = LoggerFactory.getLogger(MemberServiceImpl.class);

    private final MediaTypeRepository mediaTypeRepository;
    private final MediaSubRepository mediaSubRepository;

    @Override
    public List<MediaTypeGetRes> getMediaTypeList(MediaTypes mediaTypes, Long id) {
        List<MediaTypeGetRes> list = new ArrayList<>();

        if (Objects.requireNonNull(mediaTypes) == MediaTypes.MEDIATYPE) {
            List<MediaType> mediaTypeList = mediaTypeRepository.findAll();
            for (MediaType mediaType : mediaTypeList) {
                list.add(new MediaTypeGetRes(mediaType.getId(), mediaType.getLarge(), mediaType.getMedium()));
            }
        }

        return list;
    }

    @Override
    public List<MediaSubGetRes> getMediaSubList(MediaTypes mediaTypes, Long id) {
        List<MediaSubGetRes> list = new ArrayList<>();

        if (Objects.requireNonNull(mediaTypes) == MediaTypes.MEDIASUB) {
            List<MediaSub> mediaSubList = mediaSubRepository.findAllByMediaType_Id(id);
            for (MediaSub mediaSub : mediaSubList) {
                list.add(new MediaSubGetRes(mediaSub.getId(), mediaSub.getSmall()));
            }
        }

        return list;
    }
}
