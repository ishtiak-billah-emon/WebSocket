import express from "express";
import { WebSocketServer } from "ws";
import http from "http";

const app = express();
const port = 8080;

// const server = app.listen(port, ()=> {
//   console.log("server is listening...");
// })

// web socket server

// const wss = new WebSocketServer({server});
// wss.on("connection",(ws)=>{
//   ws.on("message", (data)=>{
//     console.log("data from client:", data.toString());
//     ws.send("Thanks buddy");
//   })
// });

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("🔗 New client connected");

  ws.on("message", (data) => {
    const message = data.toString();
    console.log("📩 Received:", message);

    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("❌ Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
