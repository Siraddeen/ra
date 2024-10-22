import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { WebSocketServer } from "ws";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Video Conference Backend is running");
});

// Set up WebSocket server for signaling
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const wss = new WebSocketServer({ server });
// wss.on("connection", (ws) => {
//   console.log("A new client connected");

//   ws.on("message", (message) => {
//     // Handle signaling messages here (e.g., offer, answer)
//     console.log("Received:", message);
//   });
// });
// Backend WebSocket signaling logic (index.ts)
//---------------------------------------------------------------------------
// wss.on("connection", (ws) => {
//   console.log("A new client connected");

//   ws.on("message", (message) => {
//     const data = JSON.parse(message.toString());

//     // Here, you'd relay the signaling messages between clients
//     console.log("Received signaling message:", data);

//     // For now, we’ll just echo the message back to all connected clients.
//     wss.clients.forEach((client) => {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(JSON.stringify(data));
//       }
//     });
//   });
// });
// aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa;
wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log("Received:", message);

    // Broadcast the message to all other connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
