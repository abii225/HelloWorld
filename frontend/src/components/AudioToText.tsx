import React, { useState, useEffect, ChangeEvent } from "react";
import { Speak } from "./Speak";

  const SpeechRecognition = 
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const mic = new SpeechRecognition();

  mic.continuous = true;
  mic.interimResults = true;
  mic.lang = "en-US";

  interface myConversation{
    user:string,
    bot?:string
  }
  interface userConversation{
    username:String,
    password:String,
    email:String
  }

  const AudioToText: React.FC = () => {
    const [isListening, setIsListening] = useState(false);
    const [value, setValue] = useState<string>("");
    const [render, setRender]= useState(false)

    const [conversation, setConversation]= useState<string[]>([])
    
    useEffect(() => {
       handleListen();
    },[isListening,conversation,render]);

    const handleListen = () => {
        if (isListening) {
            mic.start();
        } else {
          mic.stop();
        }

         mic.onresult = (event: any) => {
            const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result: any) => result.transcript)
            .join("");
            // console.log(transcript);
            setValue(transcript);
        };
    };

  const handleSend=()=>{
    let arr = conversation;
    const currentConversation:userConversation={
      username:'jahir',
      password:"123",
      email:'jp@gmail.com'
    }
    arr.push(value)
    setConversation(arr)
    fetch("https://weak-hen-top-coat.cyclic.app/user/register",{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(currentConversation)
    }).then(res=>res.json())
    .then(res=> {
      console.log(res);
      // const currentConversation:myConversation={
      //   user:value,
      //   bot:res.msg
      // }
      
      arr.push(res.msg);
      setConversation(arr)
      setRender(!render)
    })
    .catch(err=> console.log(err))
  }
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="ms-24 mt-24">
      <div>
        <div>
          {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
          <button onClick={() => setIsListening(true)} disabled={isListening}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Start
          </button>{" "}
          <span></span>
          <button
            onClick={(e)=>  setIsListening(false)}
            disabled={!isListening}
            className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Stop
          </button>
          <span> </span>
          <button
          onClick={handleSend}
            className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Send
          </button>
        </div>
      </div>
      <br />
      <div>
        <div>
          <textarea
            style={{ width: "400px", height: "100px" }}
            value={value}
            onChange={handleChange}
          ></textarea>
        </div>
          <Speak value={value} />
      </div>
      {
        conversation?.map((item,i)=>{
          return <div key={i}>
            <p>{item}</p>
          </div>
        })
      }
    </div>
  );
};

export { AudioToText };
