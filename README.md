# Noom

Zoom Clone using NodeJS, WebRTC and Websockets.

# 배운 점

## 21.12.27

### commands
`npm init -y`
* package.json 생성 시 package name, version, description 등의 필드에 대해 모두 기본값으로 생성하는 것으로 하고
* 해당 필드에 대한 값을 설정하는 질문을 건너뛴다.

`npm i nodemon -D`
* -D, --save-dev: devDependencies 에 패키지를 install 한다.
* dependencies: production 환경의 애플리케이션에서 필요한 패키지
* devDependencies: 오직 local development 와 테스팅을 위한 환경에서만 필요한 패키지

`npm i @babel/core @babel/cli @babel/node -D`
* @somescope/somepackagename
* 관련된 패키지들끼리 그룹핑하는 방법으로, npm 이 패키지를 처리하는 몇 가지 것들에도 영향을 준다.

### nodemon
* 디렉토리 내의 파일 변경을 감지하여 node 앱을 재시작함으로써 node.js 기반 앱 개발에 도움을 주는 도구
* node 의 대체 wrapper 로, nodemon 을 사용하려면 cli 에서 node 라는 단어를 바꾸면 된다.

### babel
* Javascript compiler
* 현재 및 이전 브라우저 또는 환경에서 ECMAScript 2015+ 코드를 이전 버전의 Javascript 로 변환하는데 사용되는 toolchain
* 문법 변환기를 통해 최신 버전의 Javascript 를 지원하고 JSX, Type Annotations 등의 기능도 지원한다.

### Express
* node.js 가장 인기 있는 프레임워크
* HTTP request 에 대한 handler 를 만들고, response 하기 위해 view 의 rendering 엔진과 결합한다.
* reqest handling pipeline 중 필요한 곳에 추가적인 미들웨어 처리 요청을 추가한다.