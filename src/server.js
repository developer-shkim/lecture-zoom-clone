import http from "http";
import { WebSocketServer } from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
// 사용자에게 공개될 폴더 /public 으로 지정
// frontend 에서 구동되는 코드들은 /public 에 위치하게 힘
// 프로젝트가 커지면 나중에는 어떤 코드가 frontend 인지 backend 인지 알기 어려우므로 나눠주는 것이 좋다.
// 현재 시점 기준, app.js => frontend, server.js => backend 에서 구동된다.


app.get("/", (req, res) => res.render("home"));
// 우리 홈페이지로 이동 시, 사용될 템플릿을 render

// app.get("/*", (req, res) => res.redirect("/"));
// catch all url, 어떤 url 로 입력하든 / 으로 라우팅된다.

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app); 
// http 서버 만듦

const wss = new WebSocketServer({ server });
// http 서버 위에 webSocket 서버 만듦
// 꼭 http 서버 위에 만들 필요는 없다.
// 이 프로젝트에서 http 가 지원하는 views, static files, home, redirection 을 사용하기 위함

function handleConnection(socket) {
  // server.js 의 socket 은 브라우저로의 연결을 의미
  console.log(socket);
}

wss.on("connection", handleConnection);

server.listen(3000, handleListen);
// 2개의 프로토콜이 같은 port 를 공유
