import { useReactMediaRecorder } from "react-media-recorder";
import axios from "axios";
import React, { useRef, useEffect } from "react";

export const VideoRecorder = () => {
  const videoRef = useRef(null);

  const { status, startRecording, stopRecording, mediaBlobUrl, previewStream } =
    useReactMediaRecorder({ video: true });

  useEffect(() => {
    if (videoRef.current && previewStream) {
      videoRef.current.srcObject = previewStream;
    }
  }, [previewStream]);

  const handleSave = async () => {
    if (!mediaBlobUrl) {
      console.error("No recorded video to save");
      return;
    }

    const formData = new FormData();

    try {
      const response = await fetch(mediaBlobUrl);
      const blobData = await response.blob();

      formData.append("video", blobData, "recorded_video.webm");

      const uploadResponse = await axios.post(
        "http://localhost:8080/upload",
        formData
      );
      console.log(uploadResponse.data);
    } catch (error) {
      console.error("Error saving video", error);
    }
  };

  return (
    <div>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <button onClick={handleSave}>Save Video</button>
      <video ref={videoRef} controls autoPlay loop />
    </div>
  );
};
