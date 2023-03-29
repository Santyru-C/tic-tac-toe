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

  const modifyCell = (row, column, playerMark) => {
    const cell = board[row][column]
    (cellAvailable(cell) ? cell.addMark(markStyle) : 'no')};

  return { getBoard, modifyCell };
}());

function Player(name, markStyle) {
  const name = name
  const markStyle = markStyle

  const markCell = (row, column) => currentBoard.modifyCell(row,column, markStyle);

}
currentBoard.getBoard();
