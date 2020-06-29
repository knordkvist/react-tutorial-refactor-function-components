This is the [React tutorial tic-tac-toe game](https://reactjs.org/tutorial/tutorial.html) refactored into function components.

It makes use of [react-testing-library](https://github.com/testing-library/react-testing-library) and [jest-in-case](https://github.com/atlassian/jest-in-case) for implementing a couple of integration and unit tests which were implemented and committed before the refactoring effort. See [this PR](https://github.com/knordkvist/react-tutorial-refactor-function-components/pull/2) for the actual commits.

The major changes takes place in the [Game component](https://github.com/knordkvist/react-tutorial-refactor-function-components/blob/master/src/components/game.js) which went from using React.Component.setState to a [simple reducer which mimics setState's api](https://github.com/knordkvist/react-tutorial-tic-tac-toe/blob/a09b2f8d0e8dab5a1163750e54559bea700cfa83/src/game.js#L6-L18), making the refactoring pretty painless.
