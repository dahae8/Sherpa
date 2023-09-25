package com.ssafy.adrec.product.repository;

import com.ssafy.adrec.product.ProductMedium;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductMediumRepository extends JpaRepository<ProductMedium, Long> {

    List<ProductMedium> findAllByProductLarge_Id(Long productLargeId);
}
