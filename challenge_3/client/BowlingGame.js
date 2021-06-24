export default class BowlingGame {
  constructor  () {
    this.rolls = [];
    this.currentRoll = 0;
  }

  reset () {
    this.rolls = [];
    this.currentRoll = 0;
  }

  pinsToHit () {
    const scores = this.score();
    // iterate over frames to get pins up on last frame rolled
    let pinsToHit = 10;
    scores.forEach(frame => {
      if (frame.pinsToHit !== null && !isNaN(frame.pinsToHit)) {
        pinsToHit = frame.pinsToHit
      }
    });
    return pinsToHit
  }

  score () {
    let scores = [];
    let score = 0;
    let frameIndex = 0;

    const roll1 = () => this.rolls[frameIndex];
    const roll2 = () => this.rolls[frameIndex + 1];
    const roll3 = () => this.rolls[frameIndex + 2];

    const sumOfRolls = () => roll1() + roll2();
    const spareBonus = () => roll3();
    const strikeBonus = () => roll2() + roll3();
    const isStrike = () => roll1() === 10;
    const isSpare = () => sumOfRolls() === 10;

    const saveFrame = (scoreData, leftBox, rightBox, score, pinsToHit) => {
      if (scoreData.length < 9) {
        scoreData.push({
          leftBox,
          rightBox,
          cumulativeScore: score,
          pinsToHit
        })
      } else {
        const box1 = roll1() === 10 ? 'X' : roll1();
        const box2 = roll2() === 10 ? 'X' : isSpare() ? '/' : roll2();
        let box3;
        if (box3() === 10) {
          box3 = 'X';
        } else if (roll1() === 10 || roll1() + roll2() === 10) {
          box3 = roll3();
        } else {
          box3 = '';
        }

        scoreData.push({
          leftBox: box1,
          rightBox: box2,
          cumulativeScore: score,
          pinsToHit,
          extraBox: box3
        });
      }
    };

    [...Array(10)].forEach((val, frame) => {
      if (isStrike()) {
        score += 10 + strikeBonus();
        saveFrame(scoreData, '', 'X', score, 10);
        frameIndex += 1;
      } else if (isSpare()) {
        score += 10 + spareBonus();
        saveFrame(scoreData, roll1(), '/', score, 10);
        frameIndex += 2;
      } else {
        score += sumOfRolls();
        const pinsToHit = roll2() !== undefined ? 10 : 10 - roll1();
        saveFrame(scoreData, roll1(), roll2(), score, pinsToHit);
        frameIndex += 2;
      }
    })

    return scoreData;
  }
}