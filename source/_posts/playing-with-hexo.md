---
title: Hexo 갖고 놀기
date: 2017-06-26 01:52:23
category: [Study, Hexo]
tags: [Hexo]
cover: /posts/playing-with-hexo/hexo-github.png
---

{% asset_img "hexo-github.png" "hexo-github" %}

# 헥소 갖고 놀기
헥소를 처음 사용하면서, 이것저것 테스트 해보고 기록하는 용도로 작성한 포스트입니다.

## 아카이브 cover image 설정
### 아카이브 cover 이미지 설정에 필요한 경로를 정확히 파악하기 위해서 테스트 중
1. 외부 경로 입력하면 가능하다.
2. 프로젝트 상의 경로가 아니라, deploy 되는 경로를 기준으로 작성해야 할 것 같다.
3. _config.yml의 permalink 설정에 의해 deploy 경로가 지정되는 것으로 보인다.
4. deploy 상의 경로를 바꿔서 잘 써야겠다...

```
// md 파일 최상단 설정 부분
title: playing-with-hexo
cover: 이미지 경로
```

## 디렉토리 구조
### Deploy 되는 디렉토리 구조가 왜 2017/06/26 인지 알아보자
1. _config.yml의 permalink 설정에 의한 것으로 보임. -> 근데 날짜가 왜 다르지?
2. 처음 레포지토리 생성한 날짜를 가져오는 것으로 보인다. 기존 구조는 다음과 같다. {% asset_img "test0.png" "테마 기본 상태" %}
3. permalink 를 /로 설정하고 테스트 했을 때, 다 지우니까 다음과 같이 만들어졌다. {% asset_img "test1.png" "permalink: /" %}
4. 포스트 별로 관리하기 어려워져서, 이번에는 permalink를 _posts/:title로 설정해봤더니 훨씬 보기 좋은 것 같다! :-) {% asset_img "test2.png" "permalink: _posts/:title" %}
5. 문제가 생겼다. 작성한 post로의 링크 연결이 안된다... 다시 원래대로 돌리는 중... 왜지..?
6. permalink를 posts/:title로 변경했더니 잘 된다. 언더스코어(_)로 시작하는 디렉토리 명이 오류를 발생시킨 게 아닐까 싶다. <br>deploy 되는 디렉토리 구조는 다음과 같이 정리되었다.{% asset_img "test3.png" "posts/:title" %}

md file 상단에 설정 부분이 front-matter

## Github Pages 업데이트 안됨
### 블로그를 뜯어고치던 중 Github Pages에 더이상 Deploy가 안되는 현상 - 2019.11.06
1. 테마 내 소스코드에서 오류가 발생한 경우, 로그에는 나타나지 않으면서 배포가 안되는 현상이 있는 것 같다.
2. 나의 경우는 layout pug file에 google analytics 관련 javascript 부분을 추가하면서 문제가 발생했다.
3. 알고 보니 테마 내에 이미 google analytics를 사용할 수 있도록 소스코드가 작성되어 있었다.
4. 올바른 사용법 대로 _config.yml에 google analytics 추적 ID만 적고 다시 배포하니 정상 작동한다.
