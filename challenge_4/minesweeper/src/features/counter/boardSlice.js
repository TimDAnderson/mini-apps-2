import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getRandomNumber = (n) => {
  return Math.floor((Math.random() * 1000) + 1) % n;
}

const createBoard = (height, width) => {
  let board = [];

  for (let i = 0; i < height; i++) {
    board.push([]);
    for (let j = 0; j < width; j++) {
      board[i][j] = {
        x: i,
        y: j,
        isMine: false,
        neighbour: 0,
        isRevealed: false,
        isEmpty: false,
        isFlagged: false,
      };
    }
  }
  return board;
}

const plantMines = (board, height, width, mines) => {
  let randomx, randomy, minesPlanted = 0;

  while (minesPlanted < mines) {
    randomx = getRandomNumber(width);
    randomy = getRandomNumber(height);
    if (!(board[randomx][randomy].isMine)) {
      board[randomx][randomy].isMine = true;
      minesPlanted++;
    }
  }
  return (board);
}

const traverseBoard = (x, y, board, height, width) => {
  const adjacent = [];

  if (x > 0) {
    adjacent.push(board[x - 1][y]);
  }
  if (x < height - 1) {
    adjacent.push(board[x + 1][y]);
  }
  if (y > 0) {
    adjacent.push(board[x][y - 1]);
  }
  if (y < width - 1) {
    adjacent.push(board[x][y + 1]);
  }
  if (x > 0 && y > 0) {
    adjacent.push(board[x - 1][y - 1]);
  }
  if (x > 0 && y < width - 1) {
    adjacent.push(board[x - 1][y + 1]);
  }
  if (x < height - 1 && y < width - 1) {
    adjacent.push(board[x + 1][y + 1]);
  }
  if (x < height - 1 && y > 0) {
    adjacent.push(board[x + 1][y - 1]);
  }

  return adjacent;
}

export const revealEmpty = (x, y, data) => {
  let area = traverseBoard(x, y, data);
  area.map(value => {
    if (!value.isFlagged && !value.isRevealed && (value.isEmpty || !value.isMine)) {
      data[value.x][value.y].isRevealed = true;
      if (value.isEmpty) {
        revealEmpty(value.x, value.y, data);
      }
    }
  });
  return data;
}

export const getHidden = (data) => {
  let mineArray = [];

  data.map(datarow => {
    datarow.map((dataitem) => {
      if (!dataitem.isRevealed) {
        mineArray.push(dataitem);
      }
    });
  });

  return mineArray;
}

export const getFlags = (data) => {
  let mineArray = [];

  data.map(datarow => {
    datarow.map((dataitem) => {
      if (dataitem.isFlagged) {
        mineArray.push(dataitem);
      }
    });
  });

  return mineArray;
}

const getNeighbours = (board, height, width) => {
  let updatedBoard = board

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (board[i][j].isMine !== true) {
        let mineCount = 0;
        const area = traverseBoard(board[i][j].x, board[i][j].y, board, height, width)
        area.map((value) => {
          if (value.isMine) {
            mineCount++;
          }
        });
        if (mineCount === 0) {
          updatedBoard[i][j].isEmpty = true;
        }
        updatedBoard[i][j].neighbour = mineCount
      }
    }
  }
  return updatedBoard;
}

const gameSetup = (height, width, mines) => {
  let board = createBoard(height, width)
  board = plantMines(board, height, width, mines);
  board = getNeighbours(board, height, width);
  return board;
}

const initialState = {
  height: 10,
  width: 10,
  mines: 10,
  board: gameSetup(10, 10, 10)
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    modifyboard: (state, action) => {
      const { board } = action.payload
      state.board = board
    },
    modifyMines: (state, action) => {
      const { mines } = action.payload
      state.mines = mines
    }
  }
})

export const { modifyboard, modifyMines } = boardSlice.actions;

export default boardSlice.reducer;