import React from 'react';

function OptionComp({ question, dispatch, answer }) {
  const responseSubmitted = answer !== null;

  return (
    <div className='options'>
      {question.options.map((option, currInd) => (
        <button 
          className={`btn btn-option ${currInd === answer ? "answer" :  ""} ${responseSubmitted ? currInd === question.correctOption ? "correct" : "wrong" : ""}`} 
          disabled={responseSubmitted} 
          key={option.indexQuest} 
          onClick={()=> dispatch({ type:"newAnswer", payload: currInd})}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default OptionComp;
