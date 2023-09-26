package com.ssafy.adrec.area.service;

import com.ssafy.adrec.area.AreaType;
import com.ssafy.adrec.area.Dong;
import com.ssafy.adrec.area.Sido;
import com.ssafy.adrec.area.Sigungu;
import com.ssafy.adrec.area.repository.DongRepository;
import com.ssafy.adrec.area.repository.SidoRepository;
import com.ssafy.adrec.area.repository.SigunguRepository;
import com.ssafy.adrec.member.service.MemberServiceImpl;
import com.ssafy.adrec.product.ProductLarge;
import com.ssafy.adrec.product.ProductMedium;
import com.ssafy.adrec.product.ProductSmall;
import com.ssafy.adrec.product.response.ProductGetRes;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AreaServiceImpl implements AreaService{
    public static final Logger logger = LoggerFactory.getLogger(MemberServiceImpl.class);

    private final SidoRepository sidoRepository;
    private final SigunguRepository sigunguRepository;
    private final DongRepository dongRepository;

    @Override
    public List<ProductGetRes> getList(AreaType areaType, Long id){
        List<ProductGetRes> list = new ArrayList<>();

        switch (areaType) {
            case SIDO:
                List<Sido> sidoList = sidoRepository.findAll();
                for (Sido sido : sidoList) {
                    list.add(new ProductGetRes(sido.getId(), sido.getName()));
                }
                break;
            case SIGUNGU:
                List<Sigungu> sigunguList = sigunguRepository.findAllBySido_Id(id);
                for (Sigungu sigungu : sigunguList) {
                    list.add(new ProductGetRes(sigungu.getId(), sigungu.getName()));
                }
                break;
            case DONG:
                List<Dong> dongList = dongRepository.findAllBySigungu_Id(id);
                for (Dong dong : dongList) {
                    list.add(new ProductGetRes(dong.getId(), dong.getName()));
                }
                break;
        }

        return list;

    }
}
