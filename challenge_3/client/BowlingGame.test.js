import BowlingGame from './BowlingGame.js'

describe ('Bowling Test', () => {
  let game;

  beforeEach(() => {
    game = new BowlingGame();
  })

  const rollStrike = () => {
    game.roll(10)
  }

  const rollSpare = () => {
    game.roll(5);
    game.roll(5);
  }

  const rollFullGame = (n, pins) => {
    while (n--) {
      game.roll(pins);
    }
  }

  it('should handle a gutter game', () => {
    rollFullGame(20, 0)
    let scoreboard = game.score();
    let cumulativeScore = scoreboard.pop()['cumulativeScore'];
    expect(cumulativeScore === 0);
  })

  it('should handle a perfect game', () => {
    rollFullGame(12, 10)
    let scoreboard = game.score();
    let cumulativeScore = scoreboard.pop()['cumulativeScore'];
    expect(cumulativeScore === 300);
  })

  it('should handle a inperfect game', () => {
    rollSpare()
    rollStrike()
    rollFullGame(16, 0)
    let scoreboard = game.score();
    let cumulativeScore = scoreboard.pop()['cumulativeScore'];
    expect(cumulativeScore === 30);
  })
})