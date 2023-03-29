function Cell() {
  let mark = 0;

  const addMark = (playerMark) => { mark = playerMark; };

  const getMark = () => mark;

  return { addMark, getMark };
}

const currentBoard = (function GameBoard() {
  const board = [];
  const rows = 3;
  const columns = 3;

  for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const cellAvailable = (cell) => cell.getMark() === 0;

  const modifyCell = (row, column, playerMark) => (cellAvailable(board[row][column]) ? board[row][column].addMark(playerMark) : 'no');

  return { getBoard, modifyCell };
}());

function Player(name, markStyle) {
  const markCell = (row, column) => currentBoard.modifyCell(row, column, markStyle);

  return { markCell, name, markStyle };
}

(function GameCotroller() {
  const Player1 = Player('Juan', 'X');
  const Player2 = Player('Carlos', 'O');

  const players = [Player1, Player2];
});

const Juan = Player('Juan', 'X');
currentBoard.getBoard();
