const socket = io();

const welcome = document.getElementById("welcome")
const form = welcome.querySelector("form")
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${input.value}`);
    input.value = "";
  });
}

function handleNicknameSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#name");
  socket.emit("nickname", input.value);
}
function showRoom(msg) {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const msgForm = room.querySelector("#msg");
  msgForm.addEventListener("submit", handleMessageSubmit); 
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const roomNameForm = form.querySelector("#roomName");
  const nameForm = form.querySelector("#nickname");
  socket.emit(
    "enter_room",
    roomNameForm.value,
    nameForm.value,
    showRoom
  );
  roomName = roomNameForm.value;
  roomNameForm.value = "";
  nameForm.value = "";
}

form.addEventListener("submit", handleRoomSubmit)

socket.on("welcome", (user) => {
  addMessage(`${user} joined!`);
});

socket.on("bye", (left) => {
  addMessage(`${left} leftㅠㅠ`);
});

socket.on("new_message", addMessage);

// backend 는 frontend 에서 오는 function 을 실행X (보안 문제 생길 수 있으므로)