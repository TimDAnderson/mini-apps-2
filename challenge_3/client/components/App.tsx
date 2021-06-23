import * as React from "react";
import styled from "styled-components";
import { ScoreInput } from './ScoreInput'
import { ScoreBoard } from './ScoreBoard'

export const App = () => {

  var [score, setScore] = React.useState<Number>(0);
  var [roll, setRoll] = React.useState<Number>(1);
  var [currentFrame, setCurrentFrame] = React.useState<Number>(1);
  var [frames, setFrames] = React.useState<Array<Object>>([
    {
      frame: 1,
      score: 0,
    },
    {
      frame: 2,
      score: 0,
    },
    {
      frame: 3,
      score: 0,
    },
    {
      frame: 4,
      score: 0,
    },
    {
      frame: 5,
      score: 0,
    },
    {
      frame: 6,
      score: 0,
    },
    {
      frame: 7,
      score: 0,
    },
    {
      frame: 8,
      score: 0,
    },
    {
      frame: 9,
      score: 0,
    },
    {
      frame: 10,
      score: 0,
    },
  ]);

  return (
    <div>
      Welcome to the game
      <ScoreInput />
      <ScoreBoard />
      Current Score is {score}
    </div>
  )
}