import React, { useState, useEffect } from "react";
import "./App.css";

function useCounter() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let id = setInterval(() => {
      setCounter(prevCounter => {
        console.log(prevCounter + 1)
        return prevCounter + 1
      });
    }, 1000);

    return () => {
      console.log("inside the stopCounter");
      clearInterval(id);
    };
  }, [counter]);

  return counter;
}

function Counter() {
  let counter = useCounter();
  return counter;
}

export default () => {
  let [showButton, setShowButton] = useState(true);

  return showButton ? (
    <>
      <button
        onClick={() => {
          setShowButton(false);
        }}
      >
        get rid of counter
      </button>
      <Counter />
    </>
  ) : null;
};
