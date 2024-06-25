import React from 'react';
import OptionComp from './OptionComp';

function Question({ question }) {
  return (
    <div>
        <h4>{question.question}</h4>
        <OptionComp question={question}/>
    </div>
  );
};


export default Question;