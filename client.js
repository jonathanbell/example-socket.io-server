/**
 * @file Here is an example of how you can connect to the server (locally).
 */

import { io } from "socket.io-client";

const ioClient = io.connect("http://localhost:3000");

ioClient.on("chat-message", (msg) => console.info(msg));
