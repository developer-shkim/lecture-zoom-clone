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

socket.on("welcome", (user, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${user} joined!`);
});

socket.on("bye", (left, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${left} leftㅠㅠ`);
});

socket.on("room_change", (rooms) => {
  const roomList = welcome.querySelector("ul");
  roomList.innerHTML = "";
  if (rooms.length === 0) {
    return;
  }
  // rooms 에 값이 들어와서 화면을 그리고
  // 그 다음에 rooms 에 [] 로 들어오면 비어있으므로
  // 화면을 다시 그리지 않는다. 
  console.log(rooms);
  
  rooms.forEach(room => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.append(li);
  });
});

// backend 는 frontend 에서 오는 function 을 실행X (보안 문제 생길 수 있으므로)