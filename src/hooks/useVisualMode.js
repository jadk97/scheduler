import React, { useState } from "react";
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(newMode, replace) {
    setMode(newMode);
    if (replace) {


    }
    else {
      setHistory(prev => ([newMode, ...prev]))
    }
  }

  function back() {
    if (history.length > 1) {
      setHistory(([_, ...history]) => history)
      setMode(history[0])
    }
    else {
      setMode(initial);
    }
  }
  return { mode, transition, back };

}


