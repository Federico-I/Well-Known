import React, { useEffect, useReducer } from 'react';
import Header from "./Header";
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartComp from './StartComp';
import QuestComp from './QuestComp';
import NextQuestion from './NextQuestion';
import ProgressComp from './ProgressComp';
import CompletedComp from './CompletedComp';
import Footer from './Footer';
import TimerComp from './TimerComp';

const SEC_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // "loading", "error", "ready", "active", "finished"
  status: "loading",
  indexQuest: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {

  switch(action.type) {
    case "dataReceived": 
      return { 
        ...state, 
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state, 
        status: "active",
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.indexQuest);

      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points,
      };
    case "nextQuestion":
      return {
        ...state, indexQuest: state.indexQuest + 1, answer: null
      };
    case "finish":
      return {
        ...state, status: "completed",
        highscore: state.points > state.highscore ? state.points : state.highscore, 
      };
    case "restart":
      return {
        ...initialState, questions: state.questions, status: "ready",
      };
    case "tick":
      return {
        ...state, secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default: 
      // throw new Error ("Action unknown");
  };
};

function App() {

  const [{ questions, status, indexQuest, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(reducer, initialState);

  const totalQuest = questions.length;

  const maximumPoints = questions.reduce((prev,cur) => prev + cur.points, 0)

  useEffect( function() {
    fetch("http://localhost:8000/questions").then((res) => res.json()).then((data) => dispatch({ type: "dataReceived", payload: data })).catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartComp totalQuest={totalQuest} dispatch={dispatch}/>}
        {status === "active" && (
          <>
            <ProgressComp indexQuest={indexQuest} totalQuest={totalQuest} points={points} maximumPoints={maximumPoints} answer={answer}/>
            <QuestComp question={questions[indexQuest]} dispatch={dispatch} answer={answer} />
            <Footer >
              <TimerComp dispatch={dispatch} secondsRemaining={secondsRemaining}/>
              <NextQuestion dispatch={dispatch} answer={answer} indexQuest={indexQuest} totalQuest={totalQuest}/>
            </Footer>
          </>
        )}
        {status === "completed" && (  <CompletedComp dispatch={dispatch} points={points} maximumPoints={maximumPoints} highscore={highscore}/>  )}
      </ Main>
    </div>
  );
};

export default App;
