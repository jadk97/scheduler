import React, { useState } from "react";
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  

  function transition(newMode, replace){
    if(replace){
      setMode(newMode);
    }
    else{
    setHistory([...history, newMode]);
    // console.log(history);
    setMode(newMode);
    }
  }

  function back(){
    // console.log(history);
    if(history.length > 1){
    history.pop();
    setMode(history[history.length - 1])
    }
    else{
      setMode(initial);
    }
  }
  return { mode, transition, back };

}


