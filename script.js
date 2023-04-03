const display = document.getElementById('display');
const board = document.getElementById('board');
const cells = Array.from(document.getElementsByClassName('cell'));

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
  };

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

  const callWinner = () => { display.textContent = `${currentPlayer.name} wins!`; };

  const callTie = () => { display.textContent = "It's a Tie!"; };

  const checkGameOver = () => {
    if (checkWin()) {
      callWinner();
      return true;
    } if (!checkWin() && turn === 9) {
      callTie();
      return true;
    }
    return false;
  };

  const playRound = (row, column, cell) => {
    if (currentBoard.cellAvailable(currentBoard.getBoard()[row][column])) {
      turn += 1;
      console.log(turn);
      currentBoard.modifyCell(row, column, currentPlayer.markStyle);
      (currentPlayer.markStyle === 1) ? addCross(cell) : addCircle(cell);
      if (checkGameOver()) {
        newBoard();
      } else {
        switchTurn();
        display.textContent = `${currentPlayer.name}'s turn`;
      }
    } else {
      display.textContent = 'Select a valid cell';
    }

    console.log(currentBoard.getBoard());
  };

  console.log(currentBoard.getBoard());
  display.textContent = `${currentPlayer.name}'s turn`;
  return {
    getPlayers, switchTurn, getCurrentTurn, playRound,
  };
}());

// funcion comenzar nuevo juego con los jugadores 1 y 2

const addCross = (cell) => {
  cell.classList.add('x_marked');
};

const addCircle = (cell) => {
  cell.classList.add('o_marked');
};

cells.forEach((cell) => {
  cell.addEventListener('click', () => {
    // solve bug above, maybe put dom manipulation inse gamecontroller
    GameController.playRound(cell.dataset.row, cell.dataset.column, cell);
  });
});

// script data attributes instead of hard coding
