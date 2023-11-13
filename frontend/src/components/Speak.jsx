import { useSpeechSynthesis } from "react-speech-kit";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const Speak = ({ value }) => {
  const latest = useSelector((store) => store.interviewReducer.latest);
  const { speak } = useSpeechSynthesis();
  useEffect(() => {
    speak({ text: latest });
  }, [latest]);
  return (
    <div>
      <button
        onClick={() => speak({ text: value })}
        className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Speech
      </button>
    </div>
  );
};

export { Speak };
