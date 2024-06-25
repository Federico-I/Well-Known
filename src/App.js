import React, { useEffect, useReducer } from 'react';
import Header from "./Header";
import Main from './Main';

const initialState = {
  questions: [],

  // "loading", "error", "ready", "active", "finished"
  sate: "loading",
};

function reducer(state, action) {

  switch(action.type) {
    case "dataReceived": 
      return { 
        ...state, 
        question: action.payload,
        status: "ready"
      };
    case "dataFailed":
      return{
        ...state,
        status: "error",
      };

    default: 
      throw new Error ("Action unknown");
  };
};

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect( function() {
    fetch("https://localhost:3000/questions").then((res) => res.json()).then((data) => dispatch({ type: "dataReceived", payload: data})).catch((err) => dispatch("dataFailed"));
  }, []);

  return (
    <div className="App">
      <Header />

      <Main>
        <p>1/15</p>
        <p>Question</p>
      </ Main>
    </div>
  );
};

export default App;
