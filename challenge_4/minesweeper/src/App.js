import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import { useSelector } from 'react-redux'
import { Square } from './features/Square'

const App = () => {

  const board = useSelector((state) => state.board.board)

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
                // key={square.x * row.length + square.y}
                // board={gameBoard}
                // key={square}
                // onClick={() => {handleClick(square.x, square.y)}}
                // cMenu={(e) => {handleContextMenu(e, square.x, square.y)}}
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

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <Counter />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <span>
//           <span>Learn </span>
//           <a
//             className="App-link"
//             href="https://reactjs.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             React
//           </a>
//           <span>, </span>
//           <a
//             className="App-link"
//             href="https://redux.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Redux
//           </a>
//           <span>, </span>
//           <a
//             className="App-link"
//             href="https://redux-toolkit.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Redux Toolkit
//           </a>
//           ,<span> and </span>
//           <a
//             className="App-link"
//             href="https://react-redux.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             React Redux
//           </a>
//         </span>
//       </header>
//     </div>
//   );
// }

export default App;
