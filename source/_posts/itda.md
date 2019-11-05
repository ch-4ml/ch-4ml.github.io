---
title: 이더리움 기반 이력 관리 프로젝트 - 잇다
date: 2018-04-02 07:53:15
category: [Portfolio, Public Blockchain]
tags: [Ethereum, Geth, Web3.js, PHP, APM]
cover: /posts/itda/main.png
---
# 이더리움 기반 이력 관리 프로젝트 - 잇다

## 프로젝트 팀
- 박찬형[[ch-4ml](https://github.com/ch-4ml), Back-End]
- 원소희[[infiduk](https://github.com/infiduk), Ethereum]
- 외 3명

## 프로젝트 기간
- 2018.04 ~ 2018.11

## 프로젝트 개요

### 현황 및 문제점
- 학력, 성적, 자격 위조가 무더기로 적발된 사례가 있습니다. 50만 원으로 성적 증명서, 졸업 증명서를 순식간에 바꿀 수 있었다고 합니다. 그런 가짜 이력을 가지고 직장을 얻거나 학위를 취득 하는 등의 부당한 이익을 취하는 사람들, 그로 인해 부당한 피해를 입는 사람들이 결코 적지 않았습니다.

### 제안
- 블록체인의 변조가 어려운 특징을 이용하여 개인의 이력을 기록하고, 신뢰할 수 있는 이력 정보를 필요한 곳에 사용할 수 있는 서비스를 제안하였습니다.

## 기획 문서
{% pdf itda.pdf %}

## 개발 언어 / 구성 환경
- PHP, Javascript / Geth, Web3.js, MariaDB, APM

## 구현 내용
{% youtube 2CfPk6hCgnw %}

## 프로젝트 내 역할
- Web Server 구축
- Web3.js로 Geth network와 RPC 통신

## 설명
- 취업준비생들과 나아가 자신의 이력을 관리하고 활용하고자 하는 모든 사람들을 위한 프로젝트입니다.<br>
- 사용자가 자신의 정보를 블록체인에 저장해두고 필요할 때 마다 자신의 정보를 불러와, <br>
    자기소개서나 이력서를 간편하게 작성할 수 있는 시스템을 목표로 개발하였습니다.

## Git
- [Go to Github](https://github.com/ch-4ml/itda.git)