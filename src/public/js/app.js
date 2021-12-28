const socket = new WebSocket(`ws://${window.location.host}`);
// app.js 의 socket 은 서버로의 연결을 의미
// window.location.host 는 우리가 어디에 있는지 알려줌