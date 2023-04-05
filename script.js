const GameBoard = (() => {
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

  const cellAvailable = (row, column) => getBoard()[row][column] === 0;

  const modifyCell = (row, column, playerMark) => {
    board[row][column] = playerMark;
  };

  return { getBoard, modifyCell, cellAvailable };
})();

function Player(name, markStyle) {
  return { name, markStyle };
}

function GameController(name1, name2) {
  const Player1 = Player(name1, 1);
  const Player2 = Player(name2, -1);
  const players = [Player1, Player2];

  let turn = 0;
  let currentPlayerTurn = players[0];
  const gameOver = false;

  const getPlayers = () => players;
  const getCurrentPlayerTurn = () => currentPlayerTurn;
  const switchPlayerTurn = () => {
    currentPlayerTurn = (getCurrentPlayerTurn() === players[0] ? players[1] : players[0]);
  };

  const checkRows = () => {
    for (let i = 0; i < 3; i++) {
      let rowValue = 0;
      for (let j = 0; j < 3; j++) {
        rowValue += GameBoard.getBoard()[i][j];
      }
      if (Math.abs(rowValue) === 3) return true;
    }
  };

  const checkColumns = () => {
    for (let i = 0; i < 3; i++) {
      let columnValue = 0;
      for (let j = 0; j < 3; j++) {
        columnValue += GameBoard.getBoard()[j][i];
      }
      if (Math.abs(columnValue) === 3) return true;
    }
  };

  const checkDiagonals = () => {
    let diagonalValue = 0;
    let antidiagonalValue = 0;
    for (let i = 0; i < 3; i++) {
      diagonalValue += GameBoard.getBoard()[i][i];
    }

    for (let j = 0; j < 3; j++) {
      antidiagonalValue += GameBoard.getBoard()[2 - j][j];
    }

    if ((Math.abs(diagonalValue)) === 3 || (Math.abs(antidiagonalValue) === 3)) return true;
  };

  const checkWin = () => (checkRows() || checkColumns() || checkDiagonals());

  const checkDraw = () => (!checkWin() && turn === 9);

  const checkGameOver = () => {
    if (checkWin()) { return 'win'; }
    if (checkDraw) { return 'draw'; }
  };

  // if game not finished play round
  const PlayRound = (row, column) => {
    turn += 1;
    GameBoard.modifyCell(row, column, getCurrentPlayerTurn().markStyle);
    console.log(checkGameOver());
    switchPlayerTurn();
  };

  return {
    PlayRound, getPlayers, switchPlayerTurn, currentPlayerTurn,
  };
}

// separate gameboard from player
const ScreenController = (() => {
  let currentGame;
  const getCurrentGame = () => currentGame;

  function startGame(name1, name2) {
    currentGame = GameController(name1, name2);
  }

  const addCross = (cell) => {
    cell.classList.add('x_marked');
  };

  const addCircle = (cell) => {
    cell.classList.add('o_marked');
  };

  const onCellClicked = (cell) => {
    const { row } = cell.dataset;
    const { column } = cell.dataset;
    if (GameBoard.cellAvailable(row, column)) {
      currentGame.PlayRound(row, column);
      GameBoard.getBoard()[row][column] === 1 ? addCross(cell) : addCircle(cell);
    }
  };

  const cells = Array.from(document.getElementsByClassName('cell'));
  cells.forEach((cell) => cell.addEventListener('click', () => { onCellClicked(cell); }));

  return { startGame, getCurrentGame };
})();

// ---
function test(e) {
  e.preventDefault();
  const name1 = document.getElementById('player1').value;
  const name2 = document.getElementById('player2').value;

  ScreenController.startGame(name1, name2);

  document.getElementById('player1').value = '';
  document.getElementById('player2').value = '';

  const formWrapper = document.getElementsByClassName('form-wrapper')[0];
  formWrapper.style.visibility = 'hidden';
}

const playBtn = document.getElementById('play-btn');
playBtn.addEventListener('click', test);
