import * as React from "react";
import styled from "styled-components";
import { ScoreInput } from './ScoreInput'
import { ScoreBoard } from './ScoreBoard'
import BowlingGame from '../BowlingGame'

const BowlingFrame = (props) => {

  return (
    <div className='frame'>
      <div className='frameNumber'>{props.frameNumber}</div>
      <div className='frameScore'>
        <div className='left box'>{props.leftBox}</div>
        <div className='right box'>{props.rightBox}</div>
        <div className='extra box'>{props.extraBox}</div>
      </div>
      <div className='frameScore'>{!isNaN(props.score) && props.score}</div>
    </div>
  )
}

export class App extends React.Component {
  game: any;
  constructor(props) {
    super(props);
    this.game = BowlingGame.create();
    this.state = {
      score: this.game.score()
    }
  }

  roll = (pins) => {
    console.log('someone rolled')
    this.game.roll(pins);
    this.setState({
      score: this.game.score()
    })
  }

  reset = () => {
    this.game.reset();
    this.setState({
      score: this.game.score()
    })
  }

  pinsToHit = () => {
    return this.game.pinsToHit();
  }

  render() {
    console.log(this.state['score'])

    return (
      <div>
        Welcome Player 1
        <ScoreInput roll={this.roll.bind(this)} reset={this.reset} pinsToHit={this.pinsToHit()} />
        <div className='scoreBoard'>
          {[...Array(10)].map((item, index) => {
            return (
              <BowlingFrame
                key={index}
                frameNumber={index + 1}
                leftBox={this.state['score'][index]['leftBox']}
                rightBox={this.state['score'][index]['rightBox']}
                extraBox={this.state['score'][index]['extraBox']}
                score={this.state['score'][index]['cumulativeScore']}
              />
            )
          })}
        </div>
      </div>
    )
  };
}
