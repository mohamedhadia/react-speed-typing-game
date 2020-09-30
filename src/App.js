import React, { useEffect, useState, useRef } from "react";

function App() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(15);
  const [gameRunning, setGameRunning] = useState(false);
  const inputRef = useRef(null);

  function handleChange(event) {
    const { value } = event.target;
    setText(value);
  }

  function handleWordCount() {
    const words = text.trim().split(" ");
    const filteredwirds = words.filter((word) => word !== "");
    const numberOfWords = filteredwirds.length;
    setCount(numberOfWords);
  }

  useEffect(() => {
    if ((timer > 0) & (gameRunning === true)) {
      setTimeout(() => setTimer((time) => time - 1), 1000);
    } else if (timer === 0) {
      setGameRunning(false);
      handleWordCount();
    }
  }, [timer, gameRunning]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h1>how fast do u type ? </h1>
      <textarea
        ref={inputRef}
        value={text}
        onChange={handleChange}
        disabled={!gameRunning}
      />
      <h4>time remaining {timer} s</h4>
      <button
        disabled={gameRunning}
        onClick={() => {
          setGameRunning(true);
          setTimer(15);
          setCount(0);
          setText("");
          inputRef.current.disabled = false;
          inputRef.current.focus();
        }}
      >
        start
      </button>
      <h2>word count : {count}</h2>
    </div>
  );
}

export default App;
