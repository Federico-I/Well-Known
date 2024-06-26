import React, { useEffect, useReducer } from 'react';
import Header from "./Header";
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartComp from './StartComp';
import QuestComp from './QuestComp';



const initialState = {
  questions: [],

  // "loading", "error", "ready", "active", "finished"
  status: "loading",
  indexQuest: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {

  switch(action.type) {
    case "dataReceived": 
      return { 
        ...state, 
        questions: action.payload,
        status: "ready"
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state, 
        status: "active"
      };
    case "newAnswer":
      const question = state.question.at(state.indexQuest);

      return{
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points,
      };

    default: 
      throw new Error ("Action unknown");
  };
};

function App() {

  const [{questions, status, indexQuest, answer}, dispatch] = useReducer(reducer, initialState);
  const totalQuest = questions.length;

  useEffect( function() {
    fetch("https://localhost:3000/questions").then((res) => res.json()).then((data) => dispatch({ type: "dataReceived", payload: data})).catch((err) => dispatch("dataFailed"));
  }, []);

  return (
    <div className="App">
      <Header />

      <Main>
        <p>{status === "loading" && <Loader />}</p>
        <p>{status === "error" && <Error />}</p>
        <p>{status === "ready" && <StartComp totalQuest={totalQuest} dispatch={dispatch}/>}</p>
        <p>{status === "active" && <QuestComp question={questions[indexQuest]} dispatch={dispatch} answer={answer}/>}</p>
      </ Main>
    </div>
  );
};

export default App;
