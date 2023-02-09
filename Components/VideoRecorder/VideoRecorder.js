import React, { useRef, useState } from "react";
import "./VideoRecorder.scss";
import FancyButton from "../FancyButton/FancyButton";

import { getStorage, ref, uploadBytes } from "firebase/storage";
import Fetcher from "../../utils/Fetcher";
import FirebaseVideo from "../../utils/FirebaseVideo";
import BlurredSpinner from "../BlurredSpinner/BlurredSpinner";

function VideoRecorder({ userId, videoId, type, isFetchable }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const storage = getStorage();

  return (
    <div
      className="VideoRecorderWrapper"
      style={{
        gridTemplateRows: isFetchable
          ? "1fr"
          : isRecording
          ? "1fr 32px"
          : recordedBlob
          ? "1fr 74px"
          : "1fr",
        height: isFetchable ? "auto" : isRecording ? "auto" : "auto",
      }}
    >
      {isLoading && (
        <BlurredSpinner
          style={{
            borderRadius: "8px",
          }}
        />
      )}
      <div className="VideoRecorderWrapper__top">
        <video ref={videoRef} autoPlay={true} muted={true} />
        {recordedBlob && (
          <video
            className="VideoRecorderWrapper__recordedPreview"
            src={URL.createObjectURL(recordedBlob)}
            controls
          />
        )}
        {isFetchable && (
          <video
            className="VideoRecorderWrapper__recordedPreview"
            src={FirebaseVideo(userId, videoId)}
            controls
          />
        )}
        {!isRecording && (
          <div className="VideoRecorderWrapper__emptyState">
            <h1>No response yet.</h1>
            <p>
              Click on the button below to start recording your response. Once
              you are done, click on the button again to stop recording.
            </p>
            <FancyButton
              style={{
                height: "32px",
              }}
              onClick={async () => {
                setIsRecording(true);
                streamRef.current = await navigator.mediaDevices.getUserMedia({
                  video: true,
                  audio: {
                    echoCancellation: true,
                    autoGainControl: true,
                    noiseSuppression: true,
                  },
                });
                videoRef.current.srcObject = streamRef.current;
                const recorder = new MediaRecorder(streamRef.current, {
                  mimeType: "video/webm;codecs=vp9",
                });
                const chunks = [];
                recorder.ondataavailable = (event) => {
                  chunks.push(event.data);
                };
                recorder.onstop = (event) => {
                  setRecordedBlob(new Blob(chunks, { type: "video/webm" }));
                };
                recorder.start();
              }}
            >
              Start recording
            </FancyButton>
          </div>
        )}
      </div>
      <div className="VideoRecorderWrapper__tools">
        {isRecording && (
          <FancyButton
            style={{
              height: "32px",
            }}
            onClick={() => {
              setIsRecording(false);
              streamRef.current.getTracks().forEach((track) => track.stop());
              videoRef.current.srcObject = null;
            }}
          >
            Stop recording
          </FancyButton>
        )}
        {recordedBlob && (
          <>
            <FancyButton
              style={{
                height: "32px",
              }}
              invertButton={true}
              onClick={() => {
                setIsRecording(false);
                streamRef.current.getTracks().forEach((track) => track.stop());
                videoRef.current.srcObject = null;
                setRecordedBlob(null);
              }}
            >
              Cancel recording
            </FancyButton>
            <FancyButton
              style={{
                height: "32px",
              }}
              onClick={async () => {
                setIsLoading(true);
                const storageRef = ref(
                  storage,
                  `video-resume/${userId}/${videoId}.webm`
                );
                await uploadBytes(storageRef, recordedBlob).then(
                  async (snapshot) => {
                    console.log("Uploaded a blob or file!", snapshot);
                    let bodyData = {
                      uid: userId,
                    };
                    bodyData[type] = videoId;
                    await Fetcher("/api/user/update-video-resume", {
                      method: "POST",
                      body: bodyData,
                    }).then((res) => {
                      if (res.status === 200) {
                        window.location.reload();
                      }
                    });
                  }
                );
              }}
            >
              Save recording
            </FancyButton>
          </>
        )}
      </div>
    </div>
  );
}

export default VideoRecorder;
