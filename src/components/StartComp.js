import React from 'react';

function StartComp( totalQuest, dispatch ) {
  return (
    <div className='start'>
        <h2>Welcome! are you ready to test yourself about React?</h2>
        <p> Total of {totalQuest} questions will challenge you, so if you're ready... lights... cameras... and...</p>
        <button className='btn-btn-ui' onChange={() => dispatch({ type: "start"}) }>Action!</button>
    </div>
  );
};

export default StartComp;
