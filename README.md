> ⚠️ nomadcoders 의 줌 클론 코딩 강의를 기반으로 하는 프로젝트입니다.

# Noom

Zoom Clone using NodeJS, WebRTC and Websockets.

# 배운 점

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
* nodemon.json
  * `"exec": "babel-node src/server.js"`
  * 위 설정으로 인해, 서버를 재시작하는 대신 babel-node 를 src/server.js 대상으로 실행한다.

### babel
* Javascript compiler
* 현재 및 이전 브라우저 또는 환경에서 ECMAScript 2015+ 코드를 이전 버전의 Javascript 로 변환하는데 사용되는 toolchain
* 문법 변환기를 통해 최신 버전의 Javascript 를 지원하고 JSX, Type Annotations 등의 기능도 지원한다.
* babel.config.json
  * `@babel/preset-env` 에서 정의한 위 부분은 대상 환경에 필요한 구문 변환을 세부적으로 관리할 필요 없이
  * 최신 Javascript 를 사용할 수 있게 해주는 스마트한 사전 설정이다.

### Express
* node.js 가장 인기 있는 프레임워크
* HTTP request 에 대한 handler 를 만들고, response 하기 위해 view 의 rendering 엔진과 결합한다.
* reqest handling pipeline 중 필요한 곳에 추가적인 미들웨어 처리 요청을 추가한다.

### HTTP vs WebSockets
- HTTP
  - stateless
    - 사용자와 backend 간의 연결이 없다.
    - request, response 과정 이후에 backend 는 사용자를 잊어버린다.
    - 로그인 한 사용자를 구분하는 건 cookie 를 활용한다.
    - 서버는 오직 request 를 받을 때에만 response 를 준다.
  - real-time 으로 진행되지 않는다. 
    - 사용자가 request 를 보내야 하고, 서버가 사용자에게 스스로 아무것도 못해준다.
    - 서버가 사용자에게 "안녕?" 할 수 없다. 물어봐야 답할 수 있다.
- WebSockets
  - 양방향(bi-directional)
    - connection 이 일어날 때는 악수를 하는 것과 같다. 한 번 하면 연결된다.
    - 연결돼있으므로 서버는 사용자가 누군지 기억할 수 있고, 메시지를 보낼 수도 있다.
    - request 를 받지 않고도, "안녕?" 할 수 있다.
    - 브라우저와 서버는 서로에게 바로 갈 수 있는 길이 있다.
    - ex. 핸드폰과 Wi-Fi

### backend 로 javascript object 아닌 string 을 전송하는 이유
- 프로그래밍 언어에 의존하면 안 된다.
- 연결하고 싶은 frontend, backend 서버가 어떤 언어로 만들어질지 모른다.
- javascript object 로 만들어서 클라이언트 -> 서버로 보내게 되면
- go 를 이용한 클라이언트에서는 서버에 접속할 수 없게 된다.
- ex. websocket 이 브라우저에 있는 API 이므로 서버로 보낼 때에는 항상 string 으로 변환해야 한다.
  - backend 에서는 다양한 프로그래밍 언어를 사용할 수 있으므로 어떠한 결정도 하면 안 된다.

### [SocketIO](https://socket.io/)
- websocket 을 이용한 프레임워크, websocket 이 안 되면 HTTP long-polling 으로 한다.
- 양방향, 실시간, 이벤트 기반으로 한다는 특징이 있다. 
- websocket 으로 구현하는 것보다 SocketIO 로 하는 것이 쉽고, 신뢰성이 있고, 더 많은 기능을 제공한다.

### [WebRTC](https://developer.mozilla.org/ko/docs/Web/API/WebRTC_API)
- Web Reala-Time Communication
- Peer-to-Peer 로 데이터를 주고 받을 수 있다.
- websocket 은 다른 websocket 에 전달하는 것이 아니라 서버에 전달하고 서버가 메시지를 보냈다.
- 이와 달리, 직접 전달할 수 있다. 서버가 필요하지만 영상이나 오디오를 전달할 때는 필요하지 않다.
- signaling 을 하기 위해 서버가 필요하다. sinaling 이 끝나면 P2P 연결 가능하다.
- 서버가 필요한 이유
  - 우리 브라우저로 하여금 서버가 상대의 위치를 알게 하는 것이다.
  - 브라우저가 서버한테 configuration, 위치를 전달한다.
  - 서버가 수신자의 위치를 알려주면 P2P 연결이 시작된다.
- 우리가 P2P 연결을 할 건데, 서버를 사용해야 한 브라우저가 다른 브라우저가 어디있는지 알려줄 수 있다.

### [DataChannel](https://developer.mozilla.org/ko/docs/Web/API/RTCPeerConnection/createDataChannel)
- `createDataChannel` 메소드로 데이터를 송신할 수 있는 채널을 생성한다.
- webRTC 가 안 좋을 때, peer 가 2명밖에 없을 때는 속도가 느려질 수 있다.