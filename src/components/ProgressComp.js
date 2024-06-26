import React from 'react';

function ProgressComp({ indexQuest, totalQuest, points, maximumPoints, answer}) {
  return (
    <header className='progress'>
        <progress max={totalQuest} value={indexQuest + Number(answer !== null)} />
        <p>
            Question <strong>{indexQuest}</strong> / {totalQuest}
        </p>
        <p>
            <strong>{points}</strong> / {maximumPoints}
        </p>
    </ header>
  );
};

export default ProgressComp;
