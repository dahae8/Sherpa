INSERT INTO `mediaType` VALUES (1, '온라인', '커뮤니티');
INSERT INTO `mediaType` VALUES (2, '온라인', 'SNS');
INSERT INTO `mediaType` VALUES (3, '오프라인', 'TV');
INSERT INTO `mediaType` VALUES (4, '오프라인', '라디오');
INSERT INTO `mediaType` VALUES (5, '오프라인', '인쇄');
INSERT INTO `mediaType` VALUES (6, '오프라인', '옥외');

INSERT INTO `mediaSub` VALUES (1, '버스', 6);
INSERT INTO `mediaSub` VALUES (2, '지하철', 6);
INSERT INTO `mediaSub` VALUES (3, '현수막', 6);

-- 비즈하우스
INSERT INTO company (name, url, img, mediaType_id, mediaSub_id)
VALUES ('비즈하우스', 'https://www.bizhows.com/v/option?code1=200&code2=300&code3=350&mock=200_300_350', NULL, 1, NULL),
       ('비즈하우스', 'https://www.bizhows.com/v/option?code1=200&code2=300&code3=350&mock=200_300_350', NULL, 2, NULL);

-- 한걸음컴퍼니
INSERT INTO company (name, url, img, mediaType_id, mediaSub_id)
VALUES ('한걸음컴퍼니', 'http://onestepco.kr/banner_plan.html', 'http://onestepco.kr/images/onestep_logo.png', 1, NULL);

-- 커넥트리
INSERT INTO company (name, url, img, mediaType_id, mediaSub_id)
VALUES ('커넥트리', 'https://www.connectree.net/bannerdesign89', 'https://cdn.imweb.me/thumbnail/20210824/db8f8cc4f1c56.png', 1, NULL),
       ('커넥트리', 'https://www.connectree.net/bannerdesign89', 'https://cdn.imweb.me/thumbnail/20210824/db8f8cc4f1c56.png', 2, NULL);

-- 콘텐츠랩300
INSERT INTO company (name, url, img, mediaType_id, mediaSub_id)
VALUES ('콘텐츠랩300', 'https://www.contentslab300.com/', 'https://static.wixstatic.com/media/a5491e_0e81e2a1880048ada5732a7306deef4f~mv2.png/v1/fill/w_68,h_49,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/%EB%A1%9C%EA%B3%A0.png', 2, NULL);

-- 무드온디자인
INSERT INTO company (name, url, img, mediaType_id, mediaSub_id)
VALUES ('무드온디자인', 'https://moodon.oopy.io/sns', 'https://oopy.lazyrockets.com/api/rest/cdn/image/bd4e63d3-a224-424c-9def-1243ada0914b.png', 2, NULL),
       ('무드온디자인', 'https://moodon.oopy.io/placard', 'https://oopy.lazyrockets.com/api/rest/cdn/image/bd4e63d3-a224-424c-9def-1243ada0914b.png', 6, 3);

-- (주) 알파브라더스
INSERT INTO company (name, url, img, mediaType_id, mediaSub_id)
VALUES ('(주) 알파브라더스', 'https://abbg.co.kr/?utm_source=google&utm_medium=searchad&utm_campaign=230524&utm_content=%EB%A9%94%EC%9D%B8&utm_term=%EB%94%94%EC%9E%90%EC%9D%B8%EC%A0%9C%EC%9E%91&gclid=CjwKCAjw6eWnBhAKEiwADpnw9pQdenKtIfAnjBHz8p-hY1VifezfVt3nfW6gLyEq2sa9wNP7ljSjFxoCud8QAvD_BwE#', NULL, 2, NULL);

-- CREATIVE THUMB
INSERT INTO company (name, url, img, mediaType_id, mediaSub_id)
VALUES ('CREATIVE THUMB', 'http://www.creathumb.co.kr/', 'http://www.creathumb.co.kr/uploads/media/logo.svg', 3, NULL);

-- 기억에 남는 제작소
INSERT INTO company (name, url, img, mediaType_id, mediaSub_id)
VALUES ('기억에 남는 제작소', 'https://www.un4get.co.kr/?gclid=CjwKCAjw6eWnBhAKEiwADpnw9qT4IgsBO9P0q1nXUgpdfgjEs471uO5SV6mYG9HZGLZe2Ghmr6I6zxoCDkwQAvD_BwE', 'https://cdn.imweb.me/thumbnail/20230616/00afc59454557.jpg', 3, NULL);

-- welcomeplan
INSERT INTO company (name, url, img, mediaType_id, mediaSub_id)
VALUES ('welcomeplan', 'https://www.welcomeplan.co.kr/portfolio', 'https://cdn.imweb.me/thumbnail/20180208/5a7be3efa0c52.png', 3, NULL);

-- 멜로펀치
INSERT INTO company (name, url, img, mediaType_id, mediaSub_id)
VALUES ('멜로펀치', 'https://www.mpunch.co.kr/?gcl_keyword=%EB%9D%BC%EB%94%94%EC%98%A4%EA%B4%91%EA%B3%A4%EB%B9%84%EC%9A%A9&gcl_network=g&gclid=Cj0KCQjwxuCnBhDLARIsAB-cq1psEu0kQkHwZ-JDc7dSA3SF6_t513cixRzyfbH4v9YJpJS_E6phCYEaAkYYEALw_wcB', 'https://cdn.imweb.me/thumbnail/20230822/070f06b3a7208.gif', 4, NULL);

-- 비알사운드
INSERT INTO company (name, url, img, mediaType_id, mediaSub_id)
VALUES ('비알사운드', 'http://www.brsound.co.kr/advertising-production/index.html', 'http://www.brsound.co.kr/assets/images/inc/logo.gif', 4, NULL);

-- AMFM
INSERT INTO company (name, url, img, mediaType_id, mediaSub_id)
VALUES ('AMFM', 'https://www.am-fm.co.kr/PROCESS', 'https://cdn.imweb.me/thumbnail/20211202/11a17cb0dc13f.gif', 4, NULL);

-- 이오스커뮤니케이션즈
INSERT INTO company (name, url, img, mediaType_id, mediaSub_id)
VALUES ('이오스커뮤니케이션즈', 'https://ioscom.co.kr/newspaper-ad/', 'https://ioscom.co.kr/wp-content/uploads/2018/12/%ED%95%9C%EA%B8%80%EA%B0%80%EB%A1%9C%ED%98%95_R-1.png', 5, NULL);

-- 라임트리
INSERT INTO company (name, url, img, mediaType_id, mediaSub_id)
VALUES ('라임트리', 'http://www.lime-tree.co.kr/ab-home', 'http://www.lime-tree.co.kr/images/logo.png', 5, NULL),
	   ('라임트리', 'http://www.lime-tree.co.kr/ab-home', 'http://www.lime-tree.co.kr/images/logo.png', 6, 2);


-- 팝플
INSERT INTO company (name, url, img, mediaType_id, mediaSub_id)
VALUES ('팝플', 'http://www.ppcom.kr/design-view.php?idx=35', 'http://popplecom.cdn3.cafe24.com/new/logo-top.png', 5, NULL),
       ('팝플', 'http://www.ppcom.kr/design-view.php?idx=40', 'http://popplecom.cdn3.cafe24.com/new/logo-top.png', 6, 1),
       ('팝플', 'http://www.ppcom.kr/design-view.php?idx=39', 'http://popplecom.cdn3.cafe24.com/new/logo-top.png', 6, 2);

-- 피알그리다
INSERT INTO company (name, url, img, mediaType_id, mediaSub_id)
VALUES ('피알그리다', 'https://prgrida.net/index#Portfolio', 'https://lh3.googleusercontent.com/abIqQRwFp17i25TOPwPPSajKK86vTM4VHmTgebagAdoQOhq36A0u7lZqi9kcMA4QT01YFz4_BlU54UAxYFAZ2_dFHMosmTbhGG4_FimeFM-mHoLd8-0bUEU', 6, 1),
       ('피알그리다', 'https://prgrida.net/index/view/3102891', 'https://lh3.googleusercontent.com/abIqQRwFp17i25TOPwPPSajKK86vTM4VHmTgebagAdoQOhq36A0u7lZqi9kcMA4QT01YFz4_BlU54UAxYFAZ2_dFHMosmTbhGG4_FimeFM-mHoLd8-0bUEU', 6, 2),
       ('피알그리다', 'https://prgrida.net/index#', 'https://lh3.googleusercontent.com/abIqQRwFp17i25TOPwPPSajKK86vTM4VHmTgebagAdoQOhq36A0u7lZqi9kcMA4QT01YFz4_BlU54UAxYFAZ2_dFHMosmTbhGG4_FimeFM-mHoLd8-0bUEU', 6, 3);

-- 더블유애드
INSERT INTO company (name, url, img, mediaType_id, mediaSub_id)
VALUES ('더블유애드', 'http://w-ad.co.kr/default/product/02.php?top=3&sub=1', 'http://w-ad.co.kr/default/img/homepee/images/WAD_logo6.png', 6, 1),
       ('더블유애드', 'http://w-ad.co.kr/default/product/01.php?top=3&sub=0', 'http://w-ad.co.kr/default/img/homepee/images/WAD_logo6.png', 6, 2);

-- 윌텍
INSERT INTO company (name, url, img, mediaType_id, mediaSub_id)
VALUES ('윌텍', 'http://www.will-tech.co.kr/bbs/board.php?bo_table=portfolio_7', NULL, 6, 3);