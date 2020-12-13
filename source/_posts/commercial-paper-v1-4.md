---
title: commercial-paper-v1.4
date: 2020-12-13 09:56:23
tags: [Study, Hyperledger-Fabric]
cover: /img/hyperledger/hyperledger-fabric-logo.png
---
# Commercial paper tutorial
[원본](https://hyperledger-fabric.readthedocs.io/en/release-1.4/tutorial/commercial_paper.html)

이 튜토리얼은 Commercial paper 예제 어플리케이션과 스마트컨트랙트를 설치하고 사용하는 법에 대해 다룹니다. <br><strike>업무 중심의 주제이기 때문에 Hyperledger Fabric의 개념보다는 절차에 초점을 맞춰 설명합니다.</strike> 개념을 좀 더 자세히 이해하고 싶다면 [Developing Applications]() 를 보세요.

<center>{% asset_img "commercial_paper.diagram.1.png" "다이어그램 1" %}</center>

이 튜토리얼에서 MagnetoCorp와 DigiBank 두 기관은 서로 Hyperledger Fabric 블록체인 네트워크인 PaperNet을 이용해서 상업 어음을 거래합니다.

먼저 basic network를 실행하면 MagnetoCorp의 직원인 Isabella의 역할을 대신해서 상업 어음을 발행할 것입니다. 그런 다음 역할을 바꿔서 DigiBank의 직원인 Balaji가 되어 이익을 조금 취하기 위해서 상업 어음을 구매하고, 일정 기간 들고 있다가 MargnetoCorp로 상환하게 될 것입니다.

하이퍼레저 패브릭 네트워크에서 두 개의 다른 기관이 독립적으로 일하지만, 서로 합의된 규칙에 따라 협력하는 것이 어떤 것인지 이해할 수 있도록 설계된 다음 단계를 개발자, 사용자, 관리자 역할로 수행하게 될 것입니다.

- 환경 구축과 샘플 다운로드
- 네트워크 생성
- 스마트 컨트랙트의 구조 이해하기
- MagnetoCorp로 동작해서 스마트 컨트랙트를 설치하고 인스턴스화 하기
- MagentoCorp 어플리케이션의 구조와 종속성 이해하기
- Wallet과 Identities 설정하기
- 상업 어음을 발행하기 위해서 MagnetoCorp 어플리케이션 실행하기
- DigiBank 어플리케이션에서 스마트 컨트랙트를 어떻게 사용하는지 이해하기 
- DigiBank 관점에서 상업 어음을 구매하고 상환하는 어플리케이션을 실행하기

네트워크 생성

이 튜토리얼은 basic network를 사용하고 있지만, 곧 Papernet의 multi-organization 구조를 더 잘 반영하도록 업데이트 할 것입니다. 지금은 이 네트워크로도 어떻게 어플리케이션과 스마트컨트랙트를 개발하는지 보여주기에 충분합니다.

{% asset_img "commercial_paper.diagram.3.png" "다이어그램 3" %}

