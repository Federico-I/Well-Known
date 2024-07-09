import React from 'react';

function StartComp({ totalQuest, dispatch }) {
  return (
    <div className='start'>
        <h2>Are you ready to test yourself about React?</h2>
        <h3> Total of {totalQuest} questions will challenge you, so if you're ready... lights... cameras... and...</h3>
        <button className='btn btn-ui' onClick={() => dispatch({ type: "start"})}>
          Action!
        </button>
    </div>
  );
};

export default StartComp;
