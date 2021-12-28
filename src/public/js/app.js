const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
const socket = new WebSocket(`ws://${window.location.host}`);
 
// app.js 의 socket 은 서버로의 연결을 의미
// window.location.host 는 우리가 어디에 있는지 알려줌

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅")
})

socket.addEventListener("message", (message) => {
  console.log("New message: ", message.data);
})

socket.addEventListener("close", () => {
  console.log("Disconnected to Server ❌")
})

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = ""; 
}

messageForm.addEventListener("submit", handleSubmit);