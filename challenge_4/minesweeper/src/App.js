import React from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { modifyboard, modifyMines, revealEmpty, getHidden, getFlags } from './features/counter/boardSlice'
import { Square } from './features/Square'

const App = () => {

  const board = useSelector((state) => state.board.board)
  const mines = useSelector((state) => state.board.mines)
  const dispatch = useDispatch();

  var revealBoard = () => {
    let updatedData = board;
    updatedData.map((datarow) => {
      datarow.map((dataitem) => {
        dataitem.isRevealed = true;
      });
    });
    dispatch(modifyboard({updatedData}))
  }

  var handleClick = (x, y) => {
    console.log('got a click')
    if (board[x][y].isRevealed || board[x][y].isFlagged) return null;

    if (board[x][y].isMine) {
      revealBoard();
      alert('game over');
    }

    let updatedData = [...board]
    updatedData[x][y].isFlagged = false;
    updatedData[x][y].isRevealed = true;

    if (updatedData[x][y].isEmpty) {
      updatedData = revealEmpty(x, y, updatedData);
    }

    if (getHidden(updatedData).length === mines) {
      revealBoard();
      alert('you win');
    }

    dispatch(modifyboard({updatedData}))
    let mineCount = mines - getFlags(updatedData).length
    dispatch(modifyMines({mineCount}))
  }

  var handleContextMenu = (e, x, y) => {
    e.preventDefault();
    console.log('got a right click')
    let updatedData = [...board];
    let minesCount = mines;

    if (updatedData[x][y].isRevealed) return;

    if (updatedData[x][y].isFlagged) {
      updatedData[x][y].isFlagged = false;
      minesCount++;
    } else {
      updatedData[x][y].isFlagged = true;
      minesCount--;
    }

    if (minesCount === 0) {
      const mineArray = this.getMines(updatedData);
      const FlagArray = this.getFlags(updatedData);
      if (JSON.stringify(mineArray) === JSON.stringify(FlagArray)) {
        dispatch(modifyMines({minesCount}))
        revealBoard();
        alert('you win');
      }
    }

    dispatch(modifyboard({updatedData}))
    dispatch(modifyMines({minesCount}))

  }

  return (
    <div className='game'>
      <div className='board'>
        <div className='game-info'>
          <span className='info'>Mines Remaining</span>
        {board.map((row) => {
          return row.map((square, index) => {
            return (
              <div key={square.x * row.length + square.y}>
                <Square
                onClick={() => {handleClick(square.x, square.y)}}
                cMenu={(e) => {handleContextMenu(e, square.x, square.y)}}
                value={square}
                />
                {(row[row.length - 1] === square) ? <div className="clear" /> : ""}
              </div>
            )
          })
        })}
        </div>
      </div>
    </div>
  )
}

export default App;
