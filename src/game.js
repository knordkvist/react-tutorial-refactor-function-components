import React, { useReducer } from 'react';
import { calculateWinner } from './rules';
import Board from './board';

export default function Game() {
  // A simple reducer that behaves like setState did, by simply merging old state with new state
  const [{ history, stepNumber, xIsNext }, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    }
  );

  function handleClick(i) {
    const historySlice = history.slice(0, stepNumber + 1);
    const current = historySlice[historySlice.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setState({
      history: historySlice.concat({ squares }),
      stepNumber: historySlice.length,
      xIsNext: !xIsNext,
    });
  }

  function jumpTo(step) {
    setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
