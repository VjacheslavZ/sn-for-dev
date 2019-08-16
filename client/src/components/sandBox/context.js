import React, { useState, useCallback } from 'react';


const randomColour = () => '#'+(Math.random()*0xFFFFFF<<0).toString(16);

const Button = React.memo((props) =>
  <button onClick={props.onClick} style={{background: randomColour()}}>
    {props.children}
  </button>
);

const functions = new Set();

const App = () => {
  const [delta, setDelta] = useState(1);
  const [c, setC] = useState(0);

  const incrementDelta = useCallback(() => setDelta(delta => delta + 1), []);
  const increment = useCallback(() => setC(c => c + delta), [delta]);

  const incrementBoth = useCallback(() => {
    incrementDelta();
    increment();
  }, [increment, incrementDelta]);

  // Register the functions so we can count them
  functions.add(incrementDelta);
  functions.add(increment);

  return (<div>
    <div> Delta is {delta} </div>
    <div> Counter is {c} </div>
    <br/>
    <div>
      <Button onClick={incrementDelta}>Increment Delta</Button>
      <Button onClick={increment}>Increment Counter</Button>
    </div>
    <br/>
    <div> Newly Created Functions: {functions.size - 2} </div>
  </div>)
};

export default App;

