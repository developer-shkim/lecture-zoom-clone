const socket = io();

const welcome = document.getElementById("welcome")
const form = welcome.querySelector("form")

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", { payload: input.value }, () => {
    console.log("server is done!");
  });  // 자바스크립트 object 전송 가능
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit)