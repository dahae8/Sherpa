package com.ssafy.adrec.product.response;

public class ProductGetReq {

    Long id;
    String product;

    public ProductGetReq(Long id, String product) {
        this.id = id;
        this.product = product;
    }

}
