// function Cell() {
//  let mark = 0;
//
//  const addMark = (playerMark) => { mark = playerMark; };
//
//  const getMark = () => mark;
//
//  return { addMark, getMark };
// }

const currentBoard = (function GameBoard() {
  const board = [];
  const rows = 3;
  const columns = 3;

  for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let j = 0; j < columns; j++) {
      board[i].push(0);
    }
  }

  const getBoard = () => board;

  const cellAvailable = (cell) => cell === 0;

  const modifyCell = (row, column, playerMark) => {
    board[row][column] = playerMark;
  }; // (cellAvailable(board[row][column]) ? board[row][column] = playerMark : 'no');

  return { getBoard, modifyCell, cellAvailable };
}());

function Player(name, markStyle) {
  const markCell = (row, column) => currentBoard.modifyCell(row, column, markStyle);

  return { markCell, name, markStyle };
}

const GameController = (function GameController() {
  const Player1 = Player('Juan', 'X');
  const Player2 = Player('Carlos', 'O');
  const players = [Player1, Player2];

  let currentTurn = players[0];

  const getCurrentTurn = () => currentTurn;
  const getPlayers = () => players;

  const switchTurn = () => {
    currentTurn = (currentTurn === players[0] ? players[1] : players[0]);
  };

  const playRound = (row, column) => {
    if (currentBoard.cellAvailable(currentBoard.getBoard()[row][column])) {
      currentTurn.markCell(row, column);
      console.log(currentBoard.getBoard());
      switchTurn();
    } else {
      console.log('Please, select a valid cell');
    }
  };

  console.log(currentBoard.getBoard());
  return {
    getPlayers, switchTurn, getCurrentTurn, playRound,
  };
}());
// funcion comenzar nuevo juego con los jugadores 1 y 2
