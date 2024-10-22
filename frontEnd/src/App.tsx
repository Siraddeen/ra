import { useEffect, useRef, useState } from "react";
import { connectSocket } from "./utils/socket";
import { createPeerConnection, addStreamToPeer } from "./utils/webrtc";

const App = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    // Connect to the WebSocket server
    connectSocket();

    // Get media devices (camera and microphone)
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream); // Save the stream for mute/camera controls
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        const peer = createPeerConnection(true); // The first peer will be the initiator
        addStreamToPeer(stream); // Add local stream to the peer connection
      })
      .catch((err) => console.error("Failed to access media devices:", err));
  }, []);

  // Toggle Mute/Unmute
  const toggleMute = () => {
    if (localStream) {
      localStream
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled));
      setIsMuted(!isMuted);
    }
  };

  // Toggle Enable/Disable Camera
  const toggleCamera = () => {
    if (localStream) {
      localStream
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled));
      setIsCameraOn(!isCameraOn);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          Video Conference App
        </h1>

        {/* Video Feeds */}
        <div className="grid grid-cols-2 gap-4">
          {/* Local Video */}
          <div className="bg-gray-200 aspect-video rounded-lg flex flex-col items-center justify-center">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              className="w-full h-full object-cover rounded-lg"
            />
            <p className="mt-2 text-lg font-semibold">Local Feed</p>{" "}
            {/* Label for Local Feed */}
          </div>

          {/* Remote Video */}
          <div className="bg-gray-200 aspect-video rounded-lg flex flex-col items-center justify-center">
            <video
              ref={remoteVideoRef}
              id="remoteVideo"
              autoPlay
              className="w-full h-full object-cover rounded-lg"
            />
            <p className="mt-2 text-lg font-semibold">Remote Feed</p>{" "}
            {/* Label for Remote Feed */}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={toggleMute}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            {isMuted ? "Unmute" : "Mute"}
          </button>
          <button
            onClick={toggleCamera}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            {isCameraOn ? "Disable Camera" : "Enable Camera"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;

// import { useEffect, useRef, useState } from "react";
// import { connectSocket, sendMessage } from "./utils/socket";
// import { createPeerConnection, addStreamToPeer } from "./utils/webrtc";

// const App = () => {
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isCameraOn, setIsCameraOn] = useState(true);
//   const [localStream, setLocalStream] = useState<MediaStream | null>(null);

//   useEffect(() => {
//     // Connect to the WebSocket server
//     connectSocket();

//     // Get media devices (camera and microphone)
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         setLocalStream(stream); // Save the stream for later control (mute, disable camera)
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = stream;
//         }
//         const peer = createPeerConnection(true); // The first peer will be the initiator, and the second will be responder.
//         addStreamToPeer(stream); // Add local stream to peer connection
//       })
//       .catch((err) => console.error("Failed to access media devices:", err));
//   }, []);

//   const toggleMute = () => {
//     if (localStream) {
//       localStream
//         .getAudioTracks()
//         .forEach((track) => (track.enabled = !track.enabled));
//       setIsMuted(!isMuted);
//     }
//   };

//   const toggleCamera = () => {
//     if (localStream) {
//       localStream
//         .getVideoTracks()
//         .forEach((track) => (track.enabled = !track.enabled));
//       setIsCameraOn(!isCameraOn);
//     }
//   };

//   return (
//     <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
//         <h1 className="text-2xl font-bold text-center mb-6">
//           Video Conference App
//         </h1>
//         <div className="grid grid-cols-2 gap-4">
//           {/* Local Video */}
//           <div className="bg-gray-200 aspect-video rounded-lg flex items-center justify-center">
//             <video
//               ref={localVideoRef}
//               autoPlay
//               muted
//               className="w-full h-full object-cover rounded-lg"
//             />
//           </div>
//           {/* Remote Video */}
//           <div className="bg-gray-200 aspect-video rounded-lg flex items-center justify-center">
//             <video
//               ref={remoteVideoRef}
//               id="remoteVideo"
//               autoPlay
//               className="w-full h-full object-cover rounded-lg"
//             />
//           </div>
//         </div>
//         {/* Control Buttons */}
//         <div className="mt-6 flex justify-center space-x-4">
//           <button
//             onClick={toggleMute}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//           >
//             {isMuted ? "Unmute" : "Mute"}
//           </button>
//           <button
//             onClick={toggleCamera}
//             className="px-4 py-2 bg-red-500 text-white rounded-lg"
//           >
//             {isCameraOn ? "Disable Camera" : "Enable Camera"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
//aaaaaaaaaaaaaaaaaaaaaaaaaaaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
// // import VideoPlayer from "./components/VideoPlayer";
// import { useEffect, useRef, useState } from "react";
// import { connectSocket } from "./utils/socket";
// import {
//   createPeerConnection,
//   addStreamToPeer,
//   handleSignalingData,
// } from "./utils/webrtc";

// const App = () => {
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);

//   const [isAudioMuted, setIsAudioMuted] = useState(false); // Mute/unmute state
//   const [isVideoDisabled, setIsVideoDisabled] = useState(false); // Video on/off state

//   useEffect(() => {
//     connectSocket(); // Connect to WebSocket server when component mounts

//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = stream;
//         }
//         createPeerConnection(true); // Create peer connection as initiator
//         addStreamToPeer(stream); // Add local stream to peer connection
//       })
//       .catch((err) => console.error("Failed to access media devices:", err));
//   }, []);

//   const handleMuteUnmute = () => {
//     const stream = localVideoRef.current?.srcObject as MediaStream;
//     const audioTrack = stream?.getAudioTracks()[0];
//     if (audioTrack) {
//       audioTrack.enabled = !audioTrack.enabled; // Toggle audio
//       setIsAudioMuted(!audioTrack.enabled);
//     }
//   };

//   const handleEnableDisableCamera = () => {
//     const stream = localVideoRef.current?.srcObject as MediaStream;
//     const videoTrack = stream?.getVideoTracks()[0];
//     if (videoTrack) {
//       videoTrack.enabled = !videoTrack.enabled; // Toggle video
//       setIsVideoDisabled(!videoTrack.enabled);
//     }
//   };

//   return (
//     <div className="h-screen flex justify-center items-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
//         <h1 className="text-2xl font-bold text-center mb-6">
//           Video Conference App
//         </h1>

//         {/* Video layout */}
//         <div className="grid grid-cols-2 gap-4">
//           <div className="bg-gray-200 aspect-video rounded-lg flex items-center justify-center">
//             <video
//               ref={localVideoRef}
//               autoPlay
//               muted
//               className="w-full h-full object-cover rounded-lg"
//             />
//           </div>
//           <div className="bg-gray-200 aspect-video rounded-lg flex items-center justify-center">
//             <video
//               ref={remoteVideoRef}
//               id="remoteVideo"
//               autoPlay
//               className="w-full h-full object-cover rounded-lg"
//             />
//           </div>
//         </div>

//         {/* Buttons for controlling audio and video */}
//         <div className="flex justify-center space-x-4 mt-4">
//           <button
//             onClick={handleMuteUnmute}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           >
//             {isAudioMuted ? "Unmute" : "Mute"}
//           </button>
//           <button
//             onClick={handleEnableDisableCamera}
//             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//           >
//             {isVideoDisabled ? "Enable Camera" : "Disable Camera"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
