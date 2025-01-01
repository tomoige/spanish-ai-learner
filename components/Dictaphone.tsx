import React, { useEffect } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FaMicrophoneLines } from "react-icons/fa6";

const Dictaphone = ({ onInput }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    console.log(transcript);
    onInput(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesnt support speech recognition.</span>;
  }

  return (
    <div>
      {/* <p>Microphone: {listening ? "on" : "off"}</p> */}
      <button
        onClick={
          !listening
            ? () => SpeechRecognition.startListening({ language: "es-ES" })
            : () => SpeechRecognition.stopListening()
        }
        className={`text-2xl ${listening ? "text-four" : "text-black"}`}
      >
        <FaMicrophoneLines />
      </button>
      {/* <button onClick={}>Stop</button> */}
      {/* <button onClick={resetTranscript}>Reset</button> */}
      {/* <p>{transcript}</p> */}
    </div>
  );
};
export default Dictaphone;
