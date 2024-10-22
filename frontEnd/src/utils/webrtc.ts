import Peer from "simple-peer";
import { sendMessage } from "./socket";

let peer: Peer.Instance | null = null;

export const createPeerConnection = (initiator: boolean) => {
  peer = new Peer({ initiator, trickle: false });

  // Handle signaling data and send it via WebSocket
  peer.on("signal", (data: any) => {
    console.log("Generated signaling data:", data);
    sendMessage(data); // Send offer/answer/ICE via WebSocket
  });

  // Handle the remote stream and set it to the remote video element
  peer.on("stream", (stream: any) => {
    console.log("Received remote stream:", stream);
    const videoElement = document.getElementById(
      "remoteVideo"
    ) as HTMLVideoElement;
    if (videoElement) {
      videoElement.srcObject = stream;
    }
  });

  // Optional: Handle any errors
  peer.on("error", (err: any) => {
    console.error("Error with peer connection:", err);
  });
};

// Add the local stream to the peer connection
export const addStreamToPeer = (stream: MediaStream) => {
  if (peer) {
    peer.addStream(stream);
  }
};

// Handle incoming signaling data (offer/answer/ICE candidates)
export const handleSignalingData = (data: any) => {
  if (peer) {
    peer.signal(data); // Signal peer connection with received data
  }
};

// // src/utils/webrtc.ts
// import Peer from "simple-peer";
// import { sendMessage } from "./socket";

// let peer: Peer.Instance | null = null;

// export const createPeerConnection = (initiator: boolean) => {
//   peer = new Peer({ initiator, trickle: false });

//   peer.on("signal", (data: any) => {
//     console.log("Generated signaling data:", data);
//     sendMessage(data); // Send WebRTC offer/answer via WebSocket
//   });

//   peer.on("stream", (stream: any) => {
//     // This will be the remote stream that we’ll display
//     console.log("Received remote stream:", stream);
//     const videoElement = document.getElementById(
//       "remoteVideo"
//     ) as HTMLVideoElement;
//     if (videoElement) {
//       videoElement.srcObject = stream;
//     }
//   });

//   // Optional: Handle errors
//   peer.on("error", (err: any) => {
//     console.error("Error with peer connection:", err);
//   });
// };

// export const addStreamToPeer = (stream: MediaStream) => {
//   if (peer) {
//     peer.addStream(stream);
//   }
// };

// export const handleSignalingData = (data: any) => {
//   if (peer) {
//     peer.signal(data);
//   }
// };
