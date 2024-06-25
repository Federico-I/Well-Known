import React from 'react';

function StartComp( totalQuest ) {
  return (
    <div className='start'>
        <h2>Welcome! are you ready to test yourself about React?</h2>
        <p> Total of {totalQuest} questions will challenge you, so if you're ready... lights... cameras... and...</p>
        <button className='btn-btn-ui'>Action!</button>
    </div>
  );
};

export default StartComp;
