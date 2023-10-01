CREATE DATABASE IF NOT EXISTS adrec;
USE adrec;

DROP TABLE IF EXISTS `youtubeKeyword`;

CREATE TABLE `youtubeKeyword` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`name`	VARCHAR(80)	NOT NULL,
	`total`	INT	NOT NULL
);

DROP TABLE IF EXISTS `adKeyword`;

CREATE TABLE `adKeyword` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`name`	VARCHAR(80)	NOT NULL,
	`total`	INT	NOT NULL,
	`productSmall_id`	BIGINT	NOT NULL
);

DROP TABLE IF EXISTS `subway`;

CREATE TABLE `subway` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`name`	VARCHAR(80)	NOT NULL,
	`total`	INT	NOT NULL,
	`dong_id`	BIGINT	NOT NULL
);

DROP TABLE IF EXISTS `banner`;

CREATE TABLE `banner` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`name`	VARCHAR(80)	NOT NULL,
	`address`	VARCHAR(255)	NOT NULL,
	`sigungu_id`	BIGINT	NOT NULL
);

DROP TABLE IF EXISTS `dong`;

CREATE TABLE `dong` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`name`	VARCHAR(80)	NOT NULL,
	`sigungu_id`	BIGINT	NOT NULL
);

DROP TABLE IF EXISTS `bus`;

CREATE TABLE `bus` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`name`	VARCHAR(80)	NOT NULL,
	`total`	INT	NOT NULL,
	`dong_id`	BIGINT	NOT NULL
);

DROP TABLE IF EXISTS `sigungu`;

CREATE TABLE `sigungu` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`name`	VARCHAR(80)	NOT NULL,
	`sido_id`	BIGINT	NOT NULL
);

DROP TABLE IF EXISTS `member`;

CREATE TABLE `member` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`name`	VARCHAR(80)	NOT NULL,
	`email`	VARCHAR(80)	NOT NULL,
	`pwd`	VARCHAR(80)	NOT NULL,
	`img`	VARCHAR(255)	NOT NULL,
	`productSmall_id`	BIGINT	NOT NULL
);

DROP TABLE IF EXISTS `productLarge`;

CREATE TABLE `productLarge` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`large`	VARCHAR(80)	NOT NULL
);

DROP TABLE IF EXISTS `productMedium`;

CREATE TABLE `productMedium` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`medium`	VARCHAR(80)	NOT NULL,
	`productLarge_id`	BIGINT	NOT NULL
);

DROP TABLE IF EXISTS `company`;

CREATE TABLE `company` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`name`	VARCHAR(80)	NOT NULL,
	`url`	VARCHAR(255)	NOT NULL,
	`img`	VARCHAR(255)	NOT NULL,
	`mediaType_id`	BIGINT	NOT NULL,
	`mediaSub_id`	BIGINT	NULL
);

DROP TABLE IF EXISTS `mediaRec`;

CREATE TABLE `mediaRec` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`rec_date`	DATE	NOT NULL,
	`budget`	INT	NOT NULL,
	`is_on_off`	TINYINT	NULL	DEFAULT 0	COMMENT '0 : 온라인, 1: 오프라인',
	`member_id`	BIGINT	NOT NULL,
	`productSmall_id`	BIGINT	NOT NULL,
	`sigungu_id`	BIGINT	NOT NULL
);

DROP TABLE IF EXISTS `productSmall`;

CREATE TABLE `productSmall` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`small`	VARCHAR(80)	NOT NULL,
	`code` INT NOT NULL,
	`productMedium_id`	BIGINT	NOT NULL
);

DROP TABLE IF EXISTS `target`;

CREATE TABLE `target` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`gender`	TINYINT	NOT NULL	DEFAULT 0	COMMENT '0:여성, 1:남성',
	`age`	INT	NOT NULL,
	`total`	INT	NOT NULL,
	`productSmall_id`	BIGINT	NOT NULL,
	`dong_id`	BIGINT	NOT NULL
);

DROP TABLE IF EXISTS `keywordRec`;

CREATE TABLE `keywordRec` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`rec_date`	DATE	NOT NULL,
	`productSmall_id`	BIGINT	NOT NULL,
	`member_id`	BIGINT	NOT NULL
);

DROP TABLE IF EXISTS `budget`;

CREATE TABLE `budget` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`min_budget`	INT	NOT NULL,
	`max_budget`	INT	NOT NULL,
	`mediaType_id`	BIGINT	NOT NULL,
	`mediaSub_id`	BIGINT	NULL
);

DROP TABLE IF EXISTS `keywordLike`;

CREATE TABLE `keywordLike` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`keyword`	VARCHAR(80)	NOT NULL,
	`keywordRec_id`	BIGINT	NOT NULL
);

DROP TABLE IF EXISTS `residence`;

CREATE TABLE `residence` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`gender`	TINYINT	NOT NULL	DEFAULT 0	COMMENT '0:여성, 1:남성',
	`age`	INT	NOT NULL,
	`total`	INT	NOT NULL,
	`dong_id`	BIGINT	NOT NULL
);

DROP TABLE IF EXISTS `contentRec`;

CREATE TABLE `contentRec` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`rec_date`	DATE	NOT NULL,
	`productSmall_id`	BIGINT	NOT NULL,
	`member_id`	BIGINT	NOT NULL,
	`mediaType_id`	BIGINT	NOT NULL,
	`mediaSub_id`	BIGINT	NULL
);

DROP TABLE IF EXISTS `sido`;

CREATE TABLE `sido` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`name`	VARCHAR(80)	NOT NULL
);

DROP TABLE IF EXISTS `mediaSub`;

CREATE TABLE `mediaSub` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`small`	VARCHAR(80)	NOT NULL,
	`mediaType_id`	BIGINT	NOT NULL
);

DROP TABLE IF EXISTS `mediaType`;

CREATE TABLE `mediaType` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`large`	VARCHAR(80)	NOT NULL,
	`medium`	VARCHAR(80)	NOT NULL
);

DROP TABLE IF EXISTS `contentLike`;

CREATE TABLE `contentLike` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`detail`	Text	NOT NULL,
	`contentRec_id`	BIGINT	NOT NULL
);

DROP TABLE IF EXISTS `mediaLikeGender`;

CREATE TABLE `mediaLikeGender` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`gender`	TINYINT	NOT NULL	DEFAULT 0	COMMENT '0:여성, 1:남성',
	`total`	INT	NOT NULL,
	`mediaSub_id`	BIGINT	NULL,
	`mediaType_id`	BIGINT	NOT NULL
);

DROP TABLE IF EXISTS `mediaLikeAge`;

CREATE TABLE `mediaLikeAge` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`age`	INT	NOT NULL,
	`total`	INT	NOT NULL,
	`mediaSub_id`	BIGINT	NULL,
	`mediaType_id`	BIGINT	NOT NULL
);

DROP TABLE IF EXISTS `mediaLikeArea`;

CREATE TABLE `mediaLikeArea` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`area`	VARCHAR(80)	NOT NULL,
	`total`	INT	NOT NULL,
	`mediaSub_id`	BIGINT	NULL,
	`mediaType_id`	BIGINT	NOT NULL
);

DROP TABLE IF EXISTS `productMedia`;

CREATE TABLE `productMedia` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`total`	INT	NOT NULL,
	`mediaSub_id`	BIGINT	NOT NULL,
	`mediaType_id`	BIGINT	NOT NULL,
	`productSmall_id`	BIGINT	NOT NULL,
	`like_per`	INT	NOT NULL,
);

DROP TABLE IF EXISTS `radioGender`;

CREATE TABLE `radioGender` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`gender`	TINYINT	NOT NULL	DEFAULT 0	COMMENT '0:여성, 1:남성',
	`total`	INT	NOT NULL,
	`genre`	VARCHAR(80)	NOT NULL
);

DROP TABLE IF EXISTS `radioAge`;

CREATE TABLE `radioAge` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`age`	INT	NOT NULL,
	`total`	INT	NOT NULL,
	`genre`	VARCHAR(80)	NOT NULL
);

DROP TABLE IF EXISTS `radioArea`;

CREATE TABLE `radioArea` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`area`	VARCHAR(80)	NOT NULL,
	`total`	INT	NOT NULL,
	`genre`	VARCHAR(80)	NOT NULL
);

DROP TABLE IF EXISTS `radioTime`;

CREATE TABLE `radioTime` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`age`	INT	NOT NULL,
	`is_weekday`	TINYINT	NOT NULL	DEFAULT 0	COMMENT '0:주중, 1:주말',
	`time`	INT	NOT NULL,
	`total`	INT	NOT NULL
);

DROP TABLE IF EXISTS `communityGender`;

CREATE TABLE `communityGender` (
	`id` 		BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`gender` 	TINYINT NOT NULL DEFAULT 0 COMMENT '0:여성, 1:남성',
	`name`		VARCHAR(80)	NOT NULL,
	`total`		INT	NOT NULL,
	`year`		INT	NOT NULL
);

DROP TABLE IF EXISTS `communityAge`;

CREATE TABLE `communityAge` (
	`id` 	BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`age`	INT	NOT NULL,
	`name`	VARCHAR(80)	NOT NULL,
	`total`	INT	NOT NULL,
	`year`	INT	NOT NULL
);

DROP TABLE IF EXISTS `communityArea`;

CREATE TABLE `communityArea` (
	`id` 	BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`area`	VARCHAR(80)	NOT NULL,
	`name`	VARCHAR(80)	NOT NULL,
	`total`	INT	NOT NULL,
	`year`	INT	NOT NULL
);

DROP TABLE IF EXISTS `communityTheme`;

CREATE TABLE `communityTheme` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`name`	VARCHAR(80)	NOT NULL,
	`theme`	VARCHAR(80)	NOT NULL,
	`url`	VARCHAR(255)	NOT NULL,
	`img`	VARCHAR(255)	NOT NULL
);

DROP TABLE IF EXISTS `snsGender`;

CREATE TABLE `snsGender` (
	`id` 		BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`gender`	TINYINT	NOT NULL DEFAULT 0 COMMENT '0:여성, 1:남성',
	`name`		VARCHAR(80)	NOT NULL,
	`total`		INT	NOT NULL,
	`year`		INT	NOT NULL
);

DROP TABLE IF EXISTS `snsAge`;

CREATE TABLE `snsAge` (
	`id` 	BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`age`	INT	NOT NULL,
	`name`	VARCHAR(80)	NOT NULL,
	`total`	INT	NOT NULL,
	`year`	INT	NOT NULL
);

DROP TABLE IF EXISTS `snsArea`;

CREATE TABLE `snsArea` (
	`id` 	BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`area`	VARCHAR(80)	NOT NULL,
	`name`	VARCHAR(80)	NOT NULL,
	`total`	INT	NOT NULL,
	`year`	INT	NOT NULL
);

DROP TABLE IF EXISTS `tvGender`;

CREATE TABLE `tvGender` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`gender`	TINYINT	NOT NULL	DEFAULT 0	COMMENT '0:여성, 1:남성',
	`genre`	VARCHAR(80)	NOT NULL,
	`is_free`	TINYINT	NOT NULL	DEFAULT 0	COMMENT '0:지상파, 1:유료',
	`total`	INT	NOT NULL
);

DROP TABLE IF EXISTS `tvAge`;

CREATE TABLE `tvAge` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`age`	INT	NOT NULL,
	`genre`	VARCHAR(80)	NOT NULL,
	`is_free`	TINYINT	NOT NULL	DEFAULT 0	COMMENT '0:지상파, 1:유료',
	`total`	INT	NOT NULL
);

DROP TABLE IF EXISTS `tvArea`;

CREATE TABLE `tvArea` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`area`	VARCHAR(80)	NOT NULL,
	`genre`	VARCHAR(80)	NOT NULL,
	`is_free`	TINYINT	NOT NULL	DEFAULT 0	COMMENT '0:지상파, 1:유료',
	`total`	INT	NOT NULL
);

DROP TABLE IF EXISTS `tvTime`;

CREATE TABLE `tvTime` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`age`	INT	NOT NULL,
	`is_weekday`	TINYINT	NOT NULL	DEFAULT 0	COMMENT '0:주중, 1:주말',
	`time`	INT	NOT NULL,
	`total`	INT	NOT NULL
);

DROP TABLE IF EXISTS `newsGender`;

CREATE TABLE `newsGender` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`gender`	TINYINT	NOT NULL	DEFAULT 0	COMMENT '0:여성, 1:남성',
	`name`	VARCHAR(80)	NOT NULL,
	`total`	INT	NOT NULL
);

DROP TABLE IF EXISTS `newsAge`;

CREATE TABLE `newsAge` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`age`	INT	NOT NULL,
	`name`	VARCHAR(80)	NOT NULL,
	`total`	INT	NOT NULL
);

DROP TABLE IF EXISTS `newsArea`;

CREATE TABLE `newsArea` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`area`	VARCHAR(80)	NOT NULL,
	`name`	VARCHAR(80)	NOT NULL,
	`total`	INT	NOT NULL
);

DROP TABLE IF EXISTS `newsThemeGender`;

CREATE TABLE `newsThemeGender` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`gender`	TINYINT	NOT NULL	DEFAULT 0	COMMENT '0:여성, 1:남성',
	`theme`	VARCHAR(80)	NOT NULL,
	`total`	INT	NOT NULL
);

DROP TABLE IF EXISTS `newsThemeAge`;

CREATE TABLE `newsThemeAge` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`age`	INT	NOT NULL,
	`theme`	VARCHAR(80)	NOT NULL,
	`total`	INT	NOT NULL
);

DROP TABLE IF EXISTS `newsThemeArea`;

CREATE TABLE `newsThemeArea` (
	`id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`area`	VARCHAR(80)	NOT NULL,
	`theme`	VARCHAR(80)	NOT NULL,
	`total`	INT	NOT NULL
);

ALTER TABLE `adKeyword` ADD CONSTRAINT `FK_productSmall_TO_adKeyword_1` FOREIGN KEY (
	`productSmall_id`
)
REFERENCES `productSmall` (
	`id`
);

ALTER TABLE `subway` ADD CONSTRAINT `FK_dong_TO_subway_1` FOREIGN KEY (
	`dong_id`
)
REFERENCES `dong` (
	`id`
);

ALTER TABLE `banner` ADD CONSTRAINT `FK_sigungu_TO_banner_1` FOREIGN KEY (
	`sigungu_id`
)
REFERENCES `sigungu` (
	`id`
);

ALTER TABLE `dong` ADD CONSTRAINT `FK_sigungu_TO_dong_1` FOREIGN KEY (
	`sigungu_id`
)
REFERENCES `sigungu` (
	`id`
);

ALTER TABLE `bus` ADD CONSTRAINT `FK_dong_TO_bus_1` FOREIGN KEY (
	`dong_id`
)
REFERENCES `dong` (
	`id`
);

ALTER TABLE `sigungu` ADD CONSTRAINT `FK_sido_TO_sigungu_1` FOREIGN KEY (
	`sido_id`
)
REFERENCES `sido` (
	`id`
);

ALTER TABLE `productMedium` ADD CONSTRAINT `FK_productLarge_TO_productMedium_1` FOREIGN KEY (
	`productLarge_id`
)
REFERENCES `productLarge` (
	`id`
);

ALTER TABLE `company` ADD CONSTRAINT `FK_mediaType_TO_company_1` FOREIGN KEY (
	`mediaType_id`
)
REFERENCES `mediaType` (
	`id`
);

ALTER TABLE `company` ADD CONSTRAINT `FK_mediaSub_TO_company_1` FOREIGN KEY (
	`mediaSub_id`
)
REFERENCES `mediaSub` (
	`id`
);

ALTER TABLE `mediaRec` ADD CONSTRAINT `FK_member_TO_mediaRec_1` FOREIGN KEY (
	`member_id`
)
REFERENCES `member` (
	`id`
);

ALTER TABLE `mediaRec` ADD CONSTRAINT `FK_productSmall_TO_mediaRec_1` FOREIGN KEY (
	`productSmall_id`
)
REFERENCES `productSmall` (
	`id`
);

ALTER TABLE `mediaRec` ADD CONSTRAINT `FK_sigungu_TO_mediaRec_1` FOREIGN KEY (
	`sigungu_id`
)
REFERENCES `sigungu` (
	`id`
);

ALTER TABLE `productSmall` ADD CONSTRAINT `FK_productMedium_TO_productSmall_1` FOREIGN KEY (
	`productMedium_id`
)
REFERENCES `productMedium` (
	`id`
);

ALTER TABLE `target` ADD CONSTRAINT `FK_productSmall_TO_target_1` FOREIGN KEY (
	`productSmall_id`
)
REFERENCES `productSmall` (
	`id`
);

ALTER TABLE `target` ADD CONSTRAINT `FK_dong_TO_target_1` FOREIGN KEY (
	`dong_id`
)
REFERENCES `dong` (
	`id`
);

ALTER TABLE `keywordRec` ADD CONSTRAINT `FK_productSmall_TO_keywordRec_1` FOREIGN KEY (
	`productSmall_id`
)
REFERENCES `productSmall` (
	`id`
);

ALTER TABLE `keywordRec` ADD CONSTRAINT `FK_member_TO_keywordRec_1` FOREIGN KEY (
	`member_id`
)
REFERENCES `member` (
	`id`
);

ALTER TABLE `budget` ADD CONSTRAINT `FK_mediaType_TO_budget_1` FOREIGN KEY (
	`mediaType_id`
)
REFERENCES `mediaType` (
	`id`
);

ALTER TABLE `budget` ADD CONSTRAINT `FK_mediaSub_TO_budget_1` FOREIGN KEY (
	`mediaSub_id`
)
REFERENCES `mediaSub` (
	`id`
);

ALTER TABLE `keywordLike` ADD CONSTRAINT `FK_keywordRec_TO_keywordLike_1` FOREIGN KEY (
	`keywordRec_id`
)
REFERENCES `keywordRec` (
	`id`
);

ALTER TABLE `residence` ADD CONSTRAINT `FK_dong_TO_residence_1` FOREIGN KEY (
	`dong_id`
)
REFERENCES `dong` (
	`id`
);

ALTER TABLE `contentRec` ADD CONSTRAINT `FK_productSmall_TO_contentRec_1` FOREIGN KEY (
	`productSmall_id`
)
REFERENCES `productSmall` (
	`id`
);

ALTER TABLE `contentRec` ADD CONSTRAINT `FK_member_TO_contentRec_1` FOREIGN KEY (
	`member_id`
)
REFERENCES `member` (
	`id`
);

ALTER TABLE `contentRec` ADD CONSTRAINT `FK_mediaType_TO_contentRec_1` FOREIGN KEY (
	`mediaType_id`
)
REFERENCES `mediaType` (
	`id`
);

ALTER TABLE `contentRec` ADD CONSTRAINT `FK_mediaSub_TO_contentRec_1` FOREIGN KEY (
	`mediaSub_id`
)
REFERENCES `mediaSub` (
	`id`
);

ALTER TABLE `mediaSub` ADD CONSTRAINT `FK_mediaType_TO_mediaSub_1` FOREIGN KEY (
	`mediaType_id`
)
REFERENCES `mediaType` (
	`id`
);

ALTER TABLE `contentLike` ADD CONSTRAINT `FK_contentRec_TO_contentLike_1` FOREIGN KEY (
	`contentRec_id`
)
REFERENCES `contentRec` (
	`id`
);

ALTER TABLE `mediaLikeGender` ADD CONSTRAINT `FK_mediaSub_TO_mediaLikeGender_1` FOREIGN KEY (
	`mediaSub_id`
)
REFERENCES `mediaSub` (
	`id`
);

ALTER TABLE `mediaLikeGender` ADD CONSTRAINT `FK_mediaType_TO_mediaLikeGender_1` FOREIGN KEY (
	`mediaType_id`
)
REFERENCES `mediaType` (
	`id`
);

ALTER TABLE `mediaLikeAge` ADD CONSTRAINT `FK_mediaSub_TO_mediaLikeAge_1` FOREIGN KEY (
	`mediaSub_id`
)
REFERENCES `mediaSub` (
	`id`
);

ALTER TABLE `mediaLikeAge` ADD CONSTRAINT `FK_mediaType_TO_mediaLikeAge_1` FOREIGN KEY (
	`mediaType_id`
)
REFERENCES `mediaType` (
	`id`
);

ALTER TABLE `mediaLikeArea` ADD CONSTRAINT `FK_mediaSub_TO_mediaLikeArea_1` FOREIGN KEY (
	`mediaSub_id`
)
REFERENCES `mediaSub` (
	`id`
);

ALTER TABLE `mediaLikeArea` ADD CONSTRAINT `FK_mediaType_TO_mediaLikeArea_1` FOREIGN KEY (
	`mediaType_id`
)
REFERENCES `mediaType` (
	`id`
);

ALTER TABLE `productMedia` ADD CONSTRAINT `FK_mediaSub_TO_productMedia_1` FOREIGN KEY (
	`mediaSub_id`
)
REFERENCES `mediaSub` (
	`id`
);

ALTER TABLE `productMedia` ADD CONSTRAINT `FK_mediaType_TO_productMedia_1` FOREIGN KEY (
	`mediaType_id`
)
REFERENCES `mediaType` (
	`id`
);

ALTER TABLE `productMedia` ADD CONSTRAINT `FK_productSmall_TO_productMedia_1` FOREIGN KEY (
	`productSmall_id`
)
REFERENCES `productSmall` (
	`id`
);

ALTER TABLE `member` ADD CONSTRAINT `FK_productSmall_TO_member_1` FOREIGN KEY (
	`productSmall_id`
)
REFERENCES `mediaType` (
	`id`
);