// src/components/VideoPlayer.tsx
import { useEffect, useRef } from "react";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Failed to access media devices:", err));
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      className="w-full h-full object-cover rounded-lg"
    />
  );
};

export default VideoPlayer;
