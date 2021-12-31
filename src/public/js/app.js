const socket = io();

const welcome = document.getElementById("welcome")
const form = welcome.querySelector("form")
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function showRoom(msg) {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit(
    "enter_room",
    input.value,
    showRoom
  );
  roomName = input.value;
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit) 

// backend 는 frontend 에서 오는 function 을 실행X (보안 문제 생길 수 있으므로)