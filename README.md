This is the React tutorial tic-tac-toe game refactored into function components.

It makes use of [react-testing-library](https://github.com/testing-library/react-testing-library) and [jest-in-case](https://github.com/atlassian/jest-in-case) for implementing a couple of integration and unit tests which were committed before refactoring.

The major changes takes place in the Game component which went from using React.Component.setState to a simple reducer which mimics setState's api, making the refactor pretty painless ([here's a link to that snippet](https://github.com/knordkvist/react-tutorial-tic-tac-toe/blob/a09b2f8d0e8dab5a1163750e54559bea700cfa83/src/game.js#L6-L18)).
