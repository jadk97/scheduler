import React, { useState } from "react";
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  // console.log(history);

  function transition(newMode, replace){
    setMode(newMode);
    if(replace){
      //  setHistory(prev => ([...prev, newMode]))
       
      // history.pop();
     
      // history.pop();
      // setHistory(prev => (history.slice(0, 1)))
      //    history.pop();
      // history.pop();
      // setMode(newMode);
     
    }
    else{
    // setHistory([...history, newMode]);
    setHistory(prev => ([newMode, ...prev]))
    // console.log(history);
    // setMode(newMode);
    }
  }

  function back(){
    // console.log(history);
    if(history.length > 1){
    setHistory(([_,...history]) => history)
    setMode(history[0])
    }
    else{
      setMode(initial);
    }
  }
  return { mode, transition, back };

}


