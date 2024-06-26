import React from 'react';

 function CompletedComp({ dispatch, points, maximumPoints, highscore}) {

  const percentage = (points / maximumPoints) * 100;

  let message;
  if(percentage === 100) message = "Excellent :D!";
  if(percentage >= 80 && percentage < 100) message = "Awesome :)!";
  if(percentage >= 50 && percentage < 80) message = "Well Done!";
  if(percentage >= 0 && percentage < 50) message = "Need more study :/";
  if(percentage === 0) message = ":S...want to study?";

  return (
    <>
      <p className='result'>
        <span>{message}</span> You scored <strong>{points}</strong> out of {maximumPoints} ({Math.ceil(percentage)}%);
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button className='btn btn-ui' onClick={() => dispatch({ type: "restart" })}>
        Completed!
      </ button>
    </>
  );
};

export default CompletedComp;