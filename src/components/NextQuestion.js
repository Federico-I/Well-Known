import React from 'react';

function NextQuestion({ dispatch, answer, indexQuest, totalQuest }) {
  if(answer === null) return null;

  if(indexQuest < totalQuest - 1)

    return (
        <button className='btn btn-ui' onClick={() => dispatch({type: "nextQuestion"})}>Next</ button>
    );
    
    if(indexQuest === totalQuest - 1)

        return (
            <button className='btn btn-ui' onClick={() => dispatch({ type: "finish" })}>
                Completed!
            </ button>
        );
};

export default NextQuestion;
