package com.ssafy.adrec.product.repository;

import com.ssafy.adrec.product.ProductSmall;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductSmallRepository extends JpaRepository<ProductSmall, Long> {

    Optional<ProductSmall> findById(String id);
}
