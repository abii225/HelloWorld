import { useSpeechSynthesis } from "react-speech-kit";

const Speak =({value})=>{
     const { speak } = useSpeechSynthesis();
    return  <div>
      <button onClick={() => speak({ text: value })} className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Speech</button>
  </div>
}

export {Speak}