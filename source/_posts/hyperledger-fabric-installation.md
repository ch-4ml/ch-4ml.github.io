---
title: hyperledger-fabric-installation
date: 2020-04-05 07:45:57
tags: [Study, Hyperledger-Fabric]
---
# Hyperledger Fabric Installation

Docker를 이용해 설치했습니다.

## 환경 구축

### docker 설치
```shell
$ sudo apt install docker.io
$ sudo apt install docker-compose
$ sudo apt install software-properties-common

$ sudo usermod -aG docker $USER
$ reboot

$ docker --version
$ docker
```
### curl 설치
```shell
$ sudo apt-get install curl
```

### 소스코드 빌드 시 필요한 패키지 설치
```shell
$ sudo apt-get install build-essential libssl-dev
```

### nvm 설치
```shell
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
$ source ~/.bashrc

or

$ curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh -o install_nvm.sh 
$ bash install_nvm.sh
$ source ~/.profile

--------------------------------------------------------------------------------------------------

$ nvm install v8.11.1
$ node -v
$ npm -v
```

### Go 설치
```shell
$ curl -O https://storage.googleapis.com/golang/go1.14.1.linux-amd64.tar.gz
$ tar -xvf go1.14.1.linux-amd64.tar.gz
$ sudo mv go /usr/local
$ sudo ln -s /usr/local/go/bin/go /usr/local/bin/go
$ vi ~/.profile
```
```shell
export GOPATH=$HOME/go
export PATH=$PATH:/usr/local/go/bin:$GOPATH/bin
```

### Python, Git 설치
```shell
$ sudo apt install python python-pip
$ sudo apt install git
```

### grpc 설치
```shell
$ npm install -g grpc
```

## Hyperledger Fabric 설치

### 설치
```shell
$ mkdir -p $GOPATH/src/github.com/hyperledger
$ cd $GOPATH/src/github.com/hyperledger
$ git clone https://github.com/hyperledger/fabric.git
$ cd $GOPATH/src/github.com/hyperledger
$ git clone https://github.com/hyperledger/fabric-samples.git
```

### 테스트
```shell
$ cd $GOPATH/src/github.com/hyperledger/fabric-samples
$ curl -sSL http://bit.ly/2ysbOFE | bash -s
$ cd $GOPATH/src/github.com/hyperledger/fabric-samples/fabcar
$ ./startFabric.sh
$ cd ./javascript
$ node enrollAdmin.js
$ node registerUser.js
$ node query.js
$ node invoke.js
$ node query.js
```