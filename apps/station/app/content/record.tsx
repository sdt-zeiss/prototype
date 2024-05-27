"use client";
import { useEffect } from "react";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";

export default function Record() {
  const recorderControls = useVoiceVisualizer({
    onStartRecording: () => {
      console.log("yeet");
    },
  });
  const {
    // ... (Extracted controls and states, if necessary)
    recordedBlob,
    error,
    startRecording,
    audioRef,
  } = recorderControls;

  // Get the recorded audio blob
  useEffect(() => {
    if (!recordedBlob) return;

    console.log(recordedBlob);
  }, [recordedBlob, error]);

  // Get the error when it occurs
  useEffect(() => {
    if (!error) return;

    console.error(error);
  }, [error]);

  useEffect(() => {
    setTimeout(startRecording, 2000);
  }, [startRecording]);

  return (
    <VoiceVisualizer
      barWidth={6}
      speed={2}
      rounded={0}
      backgroundColor="black"
      width={400}
      height={200}
      isControlPanelShown={false}
      isDefaultUIShown={false}
      mainBarColor="white"
      ref={audioRef}
      controls={recorderControls}
    />
  );
}
