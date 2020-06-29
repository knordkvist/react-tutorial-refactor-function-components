import Game from '../components/game';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Renders our Game component and provides some handy utils
function renderUtil() {
  var renderResult = render(<Game />);

  // A simple abstraction over Game's implementation details,
  // so that they can change without breaking all the tests
  const square = (button) => ({
    get id() {
      return button.dataset.testid;
    },
    get player() {
      return button.textContent;
    },
    click: function () {
      fireEvent.click(button);
      return this;
    },
  });

  const getSquares = (player) => renderResult.getAllByText(player).map(square);

  return {
    game: renderResult,
    get player1Squares() {
      return getSquares('X');
    },
    get player2Squares() {
      return getSquares('O');
    },
    squareById: function (id) {
      // Each id corresponds to a button's data-testid attribute value
      // Finding buttons this way is a bit brittle since we rely on the Game component to assign correct test indexes...
      return square(this.game.getByTestId(String(id)));
    },
  };
}

function play(squareById, player1Moves, player2Moves) {
  const sequentialMoves = player1Moves.reduce((acc, move, index) => {
    acc.push(move);
    // In case player 1 makes one more move than player 2
    if (index < player2Moves.length) {
      acc.push(player2Moves[index]);
    }
    return acc;
  }, []);

  sequentialMoves.forEach((id) => squareById(id).click());
}

it("places X's and O's", () => {
  const renderedGame = renderUtil();

  expect(renderedGame.squareById(0).click().player).toBe('X');
  expect(renderedGame.squareById(4).click().player).toBe('O');
  expect(renderedGame.squareById(8).click().player).toBe('X');
  expect(renderedGame.player1Squares.length).toBe(2);
  expect(renderedGame.player2Squares.length).toBe(1);
});

it("doesn't let one player overwrite the other", () => {
  const renderedGame = renderUtil();

  const player1Square = 0;
  const player2Square = 5;
  renderedGame.squareById(player1Square).click();
  expect(renderedGame.squareById(player1Square).player).toBe('X');
  // Player two clicks the same square as player 1
  renderedGame.squareById(player1Square).click();
  // It's still player 1's square
  expect(renderedGame.squareById(player1Square).player).toBe('X');
  // Player 2 goes again
  renderedGame.squareById(player2Square).click();
  expect(renderedGame.squareById(player2Square).player).toBe('O');
  // Player one clicks the same square are player 2
  renderedGame.squareById(player2Square).click();
  // It's still player 2's square
  expect(renderedGame.squareById(player2Square).player).toBe('O');
});

it('declares a winner after three in a row', () => {
  const renderedGame = renderUtil();
  const { getByText } = renderedGame.game;

  const player1 = [0, 1, 2];
  const player2 = [3, 4];
  play(renderedGame.squareById.bind(renderedGame), player1, player2);

  const winner = getByText(/Winner: /);
  expect(winner.textContent).toEqual('Winner: X');
});
