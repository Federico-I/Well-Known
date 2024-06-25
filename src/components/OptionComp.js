import React from 'react';

function OptionComp({ question }) {
  return (
    <div className='options'>
        {question.options.map((option) => (
            <button className='btn btn-option' key={option.indexQuest}>{option}</button>
        ))}
    </div>
  );
};

export default OptionComp;
