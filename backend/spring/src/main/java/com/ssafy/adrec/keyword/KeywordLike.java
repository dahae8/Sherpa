package com.ssafy.adrec.keyword;


import lombok.*;

import javax.persistence.*;
import java.util.Date;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "keywordLike")
public class KeywordLike {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(nullable = false)
    private String keyword;

    @ManyToOne
    @JoinColumn(name = "keywordRec_id", referencedColumnName = "id")
    private KeywordRec keywordRec;

    @Builder
    public KeywordLike(String keyword, KeywordRec keywordRec) {
        this.keyword = keyword;
        this.keywordRec = keywordRec;
    }
}
