import * as React from "react";

export const ScoreInput = props => {
  console.log(props);
  console.log(props.roll);

  return (
    <div className='ScoreInput'>
      <div className='leftInput'>
        {[...Array(props.pinsToHit + 1)].map((playObj, index) => {
            return (
              <button key={index} className='roll' onClick={()=>{props.roll(index)}} >
                {index}
              </button>
            )
        })}
      </div>
      <div className='rightInput'>
        <button className='resetButton' onClick={() => {props.reset()}}>
          Reset Game
        </button>
        <div>Pins still standing: {props.pinsToHit}</div>
      </div>
    </div>
  )
}
