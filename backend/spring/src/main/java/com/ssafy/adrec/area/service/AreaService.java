package com.ssafy.adrec.area.service;

import com.ssafy.adrec.area.AreaType;
import com.ssafy.adrec.product.response.ProductGetRes;

import java.util.List;

public interface AreaService {
    List<ProductGetRes> getList(AreaType areaType, Long id);
}
