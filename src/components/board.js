import React from 'react';
import Square from './square';

export default function Board({ squares, onClick }) {
  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => onClick(i)} index={i} />;
  }

  return (
    <div>
      {Array.from({ length: 3 }).map((_, row) => {
        return (
          <div className="board-row" key={row}>
            {renderSquare(row * 3)}
            {renderSquare(row * 3 + 1)}
            {renderSquare(row * 3 + 2)}
          </div>
        );
      })}
    </div>
  );
}
