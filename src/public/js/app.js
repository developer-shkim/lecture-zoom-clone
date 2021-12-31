const socket = io();

const welcome = document.getElementById("welcome")
const form = welcome.querySelector("form")

function backendDone(msg) {
  console.log(`The backend says ${msg}`);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit(
    "enter_room",
    input.value,
    backendDone
  );

  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit) 

// backend 는 frontend 에서 오는 function 을 실행X (보안 문제 생길 수 있으므로)