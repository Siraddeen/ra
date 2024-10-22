import { handleSignalingData } from "./webrtc";

let socket: WebSocket | null = null;

export const connectSocket = () => {
  socket = new WebSocket("ws://localhost:5000");

  socket.onopen = () => {
    console.log("Connected to WebSocket server");
  };

  socket.onmessage = (message) => {
    const data = JSON.parse(message.data);
    console.log("Message from server:", data);

    // Forward signaling data (offer, answer, or ICE candidates) to the WebRTC connection
    handleSignalingData(data);
  };

  socket.onclose = () => {
    console.log("Disconnected from WebSocket server");
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
};

export const sendMessage = (message: any) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message)); // Send signaling data via WebSocket
  }
};

// import { handleSignalingData } from "./webrtc";

// let socket: WebSocket | null = null;

// export const connectSocket = () => {
//   socket = new WebSocket("ws://localhost:5000");

//   socket.onopen = () => {
//     console.log("Connected to WebSocket server");
//   };

//   socket.onmessage = (message) => {
//     const data = JSON.parse(message.data);
//     console.log("Message from server:", data);

//     // If the message is signaling data, handle it
//     handleSignalingData(data);
//   };

//   socket.onclose = () => {
//     console.log("Disconnected from WebSocket server");
//   };

//   socket.onerror = (error) => {
//     console.log("WebSocket error:", error);
//   };
// };
// // export const connectSocket = () => {
// //   socket = new WebSocket("ws://localhost:5000"); // Replace with your backend WebSocket URL

// //   socket.onopen = () => {
// //     console.log("Connected to WebSocket server");
// //   };

// //   socket.onmessage = (message) => {
// //     console.log("Message from server:", message.data);
// //     // Handle signaling messages here
// //   };

// //   socket.onclose = () => {
// //     console.log("Disconnected from WebSocket server");
// //   };

// //   socket.onerror = (error) => {
// //     console.log("WebSocket error:", error);
// //   };
// // };

// export const sendMessage = (message: any) => {
//   if (socket && socket.readyState === WebSocket.OPEN) {
//     socket.send(JSON.stringify(message));
//   }
// };
