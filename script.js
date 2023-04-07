const GameBoard = (() => {
  let grid = [];
  const rows = 3;
  const columns = 3;

  const generateGrid = () => {
    for (let i = 0; i < rows; i++) {
      grid.push([]);
      for (let j = 0; j < columns; j++) {
        grid[i].push(0);
      }
    }
  };

  const getBoardGrid = () => grid;

  const checkCellAvailable = (row, column) => grid[row][column] === 0;

  const markCell = (row, column, playerMark) => { grid[row][column] = playerMark; };

  const getMarkFromCell = (row, column) => grid[row][column];

  const checkRows = () => {
    for (let i = 0; i < 3; i++) {
      let rowValue = 0;
      for (let j = 0; j < 3; j++) {
        rowValue += grid[i][j];
      }
      if (Math.abs(rowValue) === 3) return true;
    }
    return false;
  };

  const checkColumns = () => {
    for (let i = 0; i < 3; i++) {
      let columnValue = 0;
      for (let j = 0; j < 3; j++) {
        columnValue += grid[j][i];
      }
      if (Math.abs(columnValue) === 3) return true;
    }
    return false;
  };

  const checkDiagonals = () => {
    let diagonalValue = 0;
    let antidiagonalValue = 0;
    for (let i = 0; i < 3; i++) {
      diagonalValue += grid[i][i];
    }

    for (let j = 0; j < 3; j++) {
      antidiagonalValue += grid[2 - j][j];
    }

    if ((Math.abs(diagonalValue)) === 3 || (Math.abs(antidiagonalValue) === 3)) return true;
    return false;
  };

  const checkBoard = () => (checkRows() || checkColumns() || checkDiagonals());

  const resetGrid = () => {
    grid = [];
    generateGrid();
  };

  generateGrid();

  return {
    getBoardGrid,
    markCell,
    checkCellAvailable,
    checkBoard,
    getMarkFromCell,
    resetGrid,
  };
})();

// -----

const Player = (name, markStyle) => ({ name, markStyle });

// -----

const Game = (p1, p2) => {
  const Player1 = Player(p1, 1);
  const Player2 = Player(p2, -1);
  const playerList = [Player1, Player2];

  let turn = 1;
  let currentPlayerTurn = playerList[0];
  let gameState = 'in progress';

  const getCurrentTurn = () => turn;

  const resetTurnCount = () => { turn = 0; };

  const getCurrentPlayerTurn = () => currentPlayerTurn;

  const getGameState = () => gameState;

  const switchPlayerTurn = () => {
    currentPlayerTurn = (currentPlayerTurn === playerList[0] ? playerList[1] : playerList[0]);
    turn += 1;
  };

  const gameOver = () => {
    if (GameBoard.checkBoard() === true) {
      gameState = `${currentPlayerTurn.name} Wins!`;
      return true;
    } if (turn === 9) {
      console.log('tie!');
      gameState = "It's a Tie!";
      return true;
    }
    return false;
  };

  const playTurn = (row, column) => {
    GameBoard.markCell(row, column, currentPlayerTurn.markStyle);
  };

  return {
    switchPlayerTurn,
    playTurn,
    getCurrentPlayerTurn,
    getCurrentTurn,
    gameOver,
    getGameState,
    resetTurnCount,
  };
};

// -----

const Controller = (() => {
  let currentGame;
  const turnDisplay = document.getElementById('turn-display');
  const textDisplay = document.getElementById('text-display');
  const playBtn = document.getElementById('play-btn');
  const cells = Array.from(document.getElementsByClassName('cell'));

  const getCurrentGame = () => currentGame;

  const toggleGridCell = (cell) => {
    const disabled = 'cell--disabled';
    if (cell.classList.contains(disabled)) {
      cell.classList.remove(disabled);
    } else { cell.classList.add(disabled); }
  };

  const toggleDisplayBoard = () => {
    cells.forEach((cell) => toggleGridCell(cell));
  };

  const clearDisplayBoard = () => {
    cells.forEach((cell) => {
      const cellClassList = Array.from(cell.classList);
      if (cellClassList.includes('x_marked')) {
        cell.classList.remove('x_marked');
      }

      if (cellClassList.includes('o_marked')) {
        cell.classList.remove('o_marked');
      }
    });
  };

  const startGame = (event) => {
    event.preventDefault();
    const name1 = document.getElementById('player1').value;
    const name2 = document.getElementById('player2').value;
    const formWrapper = document.getElementsByClassName('form-wrapper')[0];

    currentGame = Game(name1, name2);
    formWrapper.style.visibility = 'hidden';
    toggleDisplayBoard();

    textDisplay.textContent = currentGame.getCurrentPlayerTurn().name;
    turnDisplay.textContent = currentGame.getCurrentTurn().toString();
  };

  // update display function
  // update board function

  const takeInput = (cell) => {
    const { row } = cell.dataset;
    const { column } = cell.dataset;

    if (GameBoard.checkCellAvailable(row, column)) {
      currentGame.playTurn(row, column);
      (GameBoard.getMarkFromCell(row, column) === 1) ? cell.classList.add('x_marked') : cell.classList.add('o_marked');

      if (currentGame.gameOver()) {
        textDisplay.textContent = currentGame.getGameState();
        toggleDisplayBoard();
      } else {
        currentGame.switchPlayerTurn();
        textDisplay.textContent = currentGame.getCurrentPlayerTurn().name;
        turnDisplay.textContent = currentGame.getCurrentTurn().toString();
      }
    } else {
      textDisplay.textContent = 'Please select a valid cell';
    }
  };

  playBtn.addEventListener('click', startGame);
  cells.forEach((cell) => cell.addEventListener('click', () => { takeInput(cell); }));
  toggleDisplayBoard();

  return { getCurrentGame };
})();
