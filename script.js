// function Cell() {
//  let mark = 0;
//
//  const addMark = (playerMark) => { mark = playerMark; };
//
//  const getMark = () => mark;
//
//  return { addMark, getMark };
// }

function GameBoard() {
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
}

function Player(name, markStyle) {
  return { name, markStyle };
}

const GameController = (function GameController() {
  const Player1 = Player('Juan', 1);
  const Player2 = Player('Carlos', -1);
  const players = [Player1, Player2];
  let currentBoard = GameBoard();

  let turn = 0;
  let currentPlayer = players[0];

  const getCurrentTurn = () => currentPlayer;
  const getPlayers = () => players;

  const switchTurn = () => {
    currentPlayer = (currentPlayer === players[0] ? players[1] : players[0]);
  };

  const newBoard = () => {
    currentBoard = GameBoard();
    turn = 0;
  };

  const checkRows = () => {
    for (let i = 0; i < 3; i++) {
      let rowValue = 0;
      for (let j = 0; j < 3; j++) {
        rowValue += currentBoard.getBoard()[i][j];
      }
      if (Math.abs(rowValue) === 3) return true;
    }
  };

  const checkColumns = () => {
    for (let i = 0; i < 3; i++) {
      let columnValue = 0;
      for (let j = 0; j < 3; j++) {
        columnValue += currentBoard.getBoard()[j][i];
      }
      if (Math.abs(columnValue) === 3) return true;
    }
  };

  const checkDiagonals = () => {
    let diagonalValue = 0;
    let antidiagonalValue = 0;
    for (let i = 0; i < 3; i++) {
      diagonalValue += currentBoard.getBoard()[i][i];
    }

    for (let j = 0; j < 3; j++) {
      antidiagonalValue += currentBoard.getBoard()[2 - j][j];
    }

    if ((Math.abs(diagonalValue)) === 3 || (Math.abs(antidiagonalValue) === 3)) return true;
  };

  const checkWin = () => (checkRows() || checkColumns() || checkDiagonals());

  const callWinner = () => `${currentPlayer} wins!`;

  const callTie = () => "It's a Tie!";

  const playRound = (row, column) => {
    turn += 1;
    console.log(turn);
    if (currentBoard.cellAvailable(currentBoard.getBoard()[row][column])) {
      currentBoard.modifyCell(row, column, currentPlayer.markStyle);
      switchTurn();
    } else {
      console.log('Please, select a valid cell');
    }
    console.log(currentBoard.getBoard());
  };

  console.log(currentBoard.getBoard());
  return {
    getPlayers, switchTurn, getCurrentTurn, playRound,
  };
}());

// funcion comenzar nuevo juego con los jugadores 1 y 2
