import { calculateWinner } from '../rules';
import cases from 'jest-in-case';

cases(
  'winning moves',
  (opts) => {
    expect(calculateWinner(opts.squares)).toBe(opts.winner);
  },
  [
    {
      name: 'Horizontally row 1',
      squares: [
        'X',
        'X',
        'X',
        'O',
        'O',
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      winner: 'X',
    },
    {
      name: 'Diagonally top left to bottom right',
      squares: [
        'O',
        'X',
        'X',
        undefined,
        'O',
        undefined,
        undefined,
        undefined,
        'O',
      ],
      winner: 'O',
    },
    {
      name: 'No winner',
      squares: [
        'X',
        'O',
        'X',
        'O',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      winner: null,
    },
  ]
);
