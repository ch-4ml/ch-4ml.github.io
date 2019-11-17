---
title: itv-hf-transaction
date: 2019-11-15 09:37:37
tags:
---
# MVCC 충돌과 낙관적 잠금
MVCC conflict & Optimistic lock

## MVCC란?
MVCC(Multi-Version Concurrency Control)는 동시 접근을 허용하는 저장소에서 동시성을 제어하기 위해(간단히 말해서 키 충돌을 막기 위해) 사용하는 방법중 하나로, MCC라고도 합니다.

이 때, 키 충돌은 Hyperledger Fabric에만 국한된 것이 아니라 전반적인 컴퓨터 과학 문제입니다.

Hyperledger Fabric에 초점을 맞춰 설명하기 위해서는 먼저 Transaction Lifecycle을 살펴볼 필요가 있습니다.

## Transaction Lifecycle in Hyperledger Fabric
{% asset_img "tx-life-cycle.png" "Transaction Life Cycle in Hyperledger Fabric" %}
1. SDK가 하나 이상의 Peer에게 Transaction Proposal을 전송합니다.
2. Peer는 Chaincode, Ledger의 현재 상태, Request의 Parameter를 이용하여 해당 트랜잭션을 시뮬레이션 합니다.
3. Peer는 시뮬레이션 결과를 SDK에 Return합니다. 결과는 시뮬레이션 중 업데이트 된 Key/Value Set입니다.
4. SDK는 3의 Set(여러개의 Set도 가능)를 수집하고 개인 키로 서명한 뒤 Ordering Service(Orderer)에 전송합니다.
5. Ordering Service는 서명과 Set의 유효성을 검증한 뒤 Queue에 넣습니다.
6. Queue가 꽉 차거나 사전에 정의된 시간이 지나면, 이 Set들을 정렬하고 블록에 담은 뒤, 블록에 서명하고 Peer에 블록을 전송합니다.
7. Peer는 서명의 유효성을 검증하고, Ledger의 상태가 시뮬레이션이 실행됐을 때의 상태와 같은지 검증합니다.
8. 유효성 검증이 성공하면 해당 Transaction은 Ledger를 Update합니다.
9. 유효성 검증이 실패하면 해당 Transaction은 Blockchain에 저장되지만, Ledger는 업데이트되지 않습니다.

이 설명에서 많은 세부 사항이 누락되었지만 지금은 그렇게 중요하지 않습니다.

SDK가 첫 번째 요청을 보내는 시간과 이 트랜잭션이 실제로 블록체인에 저장되는 시간은 정해져있지 않고, 몇 초 정도 소요됩니다. 그리고 이 과정은 대부분 병렬로 실행됩니다.

### 자, 여기서 문제가 무엇일까요?
간단한 예시를 봅시다. 밥이 앨리스에게 송금하는 체인코드가 있는데, 체인코드는 송금하기 전에 밥이 충분한 액수를 가지고 있는지 반드시 검증해야 하고, 그렇지 않은 경우에는 취소되어야 합니다.

현재 밥은 10개의 토큰을 가지고 있고 10개의 토큰을 앨리스에게 보내도록 요청했습니다.
체인코드는 이 액수가 정확한지를 시뮬레이션 하는 동안에 검증할 것입니다. 그리고 이 트랜잭션은 Commit을 위해 Orderer에게 보내집니다.

하지만, 만약 동시에 밥이 10개의 토큰을 보내기 위해 다른 트랜잭션을 이브한테 전송한다면 어떤 일이 일어날지 상상해보세요. 시뮬레이션에서 앨리스에게 전송했다는 사실은 검증되지만 Commit되지 않았기 때문에, 체인코드는 밥이 필요한 액수를 보유했다고 확인할 것입니다. 결과적으로 밥은 10개의 토큰을 가지고 있는 동안에 20개의 토큰을 전송하게 되는 것입니다.

이것이 바로 전형적인 “이중 지불 문제(Double Spending Problem)”입니다.