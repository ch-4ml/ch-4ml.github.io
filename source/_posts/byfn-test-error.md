---
title: byfn-test-error
date: 2020-04-20 00:55:43
tags:
---

# Byfn 테스트 중 의문점 발생

## Hyperledger Fabric v1.4.6

프로젝트를 진행하기 위해서 first-network, chaincode/fabcar/go, fabcar/javascript를<br> 다른 디렉토리로 복사하고 startFabric.sh를 실행했더니 다음과 같은 에러가 발생했다.

```
path to chaincode does not exist: /opt/gopath/chaincode/fabcar/go
```
에러의 원인은 org1의 peer0에서 chaincode install을 하려는데 chaincode 위치를 찾지 못하는 것.

실제로 해당 컨테이너로 들어가봤을 때 
```
root@CONTAINERID:/opt/gopath# ls
src
```
체인코드가 없었다.

보통은 docker-compose에서 volumes 속성을 지정해서 docker container가 local의 경로로부터<br> 리소스를 사용할 수 있도록 설정하는 것으로 알고 있었기 때문에 byfn.sh에서 사용하는 docker-compose 파일을 열어봤다.

사용되고 있는 docker-compose 파일은 아래의 docker-compose-cli.yaml

```
// docker-compose-cli.yaml

...
services:

  orderer.example.com:
    extends:
      file:   base/docker-compose-base.yaml
      service: orderer.example.com
    container_name: orderer.example.com
    networks:
      - byfn

  peer0.org1.example.com:
    container_name: peer0.org1.example.com
    extends:
      file:  base/docker-compose-base.yaml
      service: peer0.org1.example.com
    networks:
      - byfn
```
여기서 문제가 발생한 org1의 peer0은 base/docker-compose-base.yaml을 사용하고 있다.
```
// docker-compose-base.yaml
services:
...

  peer0.org1.example.com:
    container_name: peer0.org1.example.com
    extends:
      file: peer-base.yaml
      service: peer-base
    environment:
      - CORE_PEER_ID=peer0.org1.example.com
      - CORE_PEER_ADDRESS=peer0.org1.example.com:7051
      - CORE_PEER_LISTENADDRESS=0.0.0.0:7051
      - CORE_PEER_CHAINCODEADDRESS=peer0.org1.example.com:7052
      - CORE_PEER_CHAINCODELISTENADDRESS=0.0.0.0:7052
      - CORE_PEER_GOSSIP_BOOTSTRAP=peer1.org1.example.com:8051
      - CORE_PEER_GOSSIP_EXTERNALENDPOINT=peer0.org1.example.com:7051
      - CORE_PEER_LOCALMSPID=Org1MSP
    volumes:
        - /var/run/:/host/var/run/
        - ../crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/msp:/etc/hyperledger/fabric/msp
        - ../crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls:/etc/hyperledger/fabric/tls
        - peer0.org1.example.com:/var/hyperledger/production
    ports:
      - 7051:7051
```
volumes에 위치를 찾지 못하는 경로와 연결할 local 경로를 연결하는 부분을 추가했다.
```
volumes:
        - /var/run/:/host/var/run/
        - ../crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/msp:/etc/hyperledger/fabric/msp
        - ../crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls:/etc/hyperledger/fabric/tls
        - peer0.org1.example.com:/var/hyperledger/production
        // 추가
        - ../../chaincode:/opt/gopath/src/github.com/chaincode
```
이후 startFabric.sh 파일을 실행하니, 정상적으로 작동(install, instantiate)했다.

<b>본격적인 의문점은 여기서부터 생기는데,</b><br>
에러를 기록하기 위해서 다시 한 번 docker-compose-base.yaml을 원래대로 돌려놓고 startFabric.sh를 실행해봤더니 <b>정상적으로 작동</b>이 된다.

<h2>?????</h2>

한 가지 더. startFabric.sh에
```shell
...

# don't rewrite paths for Windows Git Bash users
export MSYS_NO_PATHCONV=1
starttime=$(date +%s)
CC_SRC_LANGUAGE=${1:-"go"}
CC_SRC_LANGUAGE=`echo "$CC_SRC_LANGUAGE" | tr [:upper:] [:lower:]`
if [ "$CC_SRC_LANGUAGE" = "go" -o "$CC_SRC_LANGUAGE" = "golang"  ]; then
	CC_RUNTIME_LANGUAGE=golang
	CC_SRC_PATH=github.com/chaincode/fabcar/go
elif [ "$CC_SRC_LANGUAGE" = "java" ]; then
	CC_RUNTIME_LANGUAGE=java
	CC_SRC_PATH=/opt/gopath/src/github.com/chaincode/fabcar/java
elif [ "$CC_SRC_LANGUAGE" = "javascript" ]; then
	CC_RUNTIME_LANGUAGE=node # chaincode runtime language is node.js
	CC_SRC_PATH=/opt/gopath/src/github.com/chaincode/fabcar/javascript
elif [ "$CC_SRC_LANGUAGE" = "typescript" ]; then
	CC_RUNTIME_LANGUAGE=node # chaincode runtime language is node.js
	CC_SRC_PATH=/opt/gopath/src/github.com/chaincode/fabcar/typescript
	echo Compiling TypeScript code into JavaScript ...
	pushd ../chaincode/fabcar/typescript
	npm install
	npm run build
	popd
	echo Finished compiling TypeScript code into JavaScript
else
	echo The chaincode language ${CC_SRC_LANGUAGE} is not supported by this script
	echo Supported chaincode languages are: go, javascript, and typescript
	exit 1
fi

...
```
왜 golang일 때만 CC_SRC_PATH에 /opt/gopath/src/가 빠질까...

다른 언어일 경우에 테스트를 해봐야겠다.