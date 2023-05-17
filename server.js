import { whiteCards } from "./data/cah.js";
import { users } from "./data/users.js";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const server = new Server(3000, {
  cors: {
    origin: "*",
    methods: "*",
    credentials: false,
  }
});

server.on("connection", (socket) => {
  console.info(`New client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.info(`Client disconnected: ${socket.id}`);
  });
});

const emitChatMessage = () => {
  const chatMessage = {
    type: "chat-message",
    id: uuidv4(),
    body: whiteCards[Math.floor(Math.random() * whiteCards.length)],
    user: users[Math.floor(Math.random() * users.length)],
    time: new Date().toISOString().split(".")[0].replace("T", " "),
  };

  server.emit("chat-message", chatMessage);
};

// https://stackoverflow.com/a/6962808/1171790
(function loop() {
  const rand = Math.round(Math.random() * (3000 - 100)) + 100; // 0.1 to 3 seconds
  setTimeout(() => {
    emitChatMessage();
    loop();
  }, rand);
}());
