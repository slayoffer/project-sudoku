const boardDrawCfonts = require('./boardDrow');

function solve(boardString) {
  // Creating initial empty board

  const initBoard = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  // For loop to fill in the board with numbers from the string

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      initBoard[i].push(Number(boardString[i * 9 + j]));
    }
  }

  // Function to check all cells for zero
  // if so returns the position of the empty cell
  // otherwise returns null

  const zeroFinder = (board) => {
    for (let row = 0; row < board.length; row++) {
      for (let column = 0; column < board.length; column++) {
        if (board[row][column] === 0) return [row, column];
      }
    }
    return null;
  };

  // Func to check if the number we are looking for exists in the row, column or 3x3 box

  // ! Number is not to be found in the cell we are checking

  const validate = (currNum, position, board) => {
    const [row, column] = position;

    // rows (returns false if number exists in the column)

    for (let i = 0; i < 9; i += 1) {
      if (board[i][column] === currNum && i !== row) return false;
    }

    // columns (returns false if number exists in the row)

    for (let i = 0; i < 9; i++) {
      if (board[row][i] === currNum && i !== column) return false;
    }

    // 3x3 box (returns false if number exists in the box)

    // ! Calculating starting position of the box (row and column coordinates)

    const rowStart = Math.floor(row / 3) * 3;
    const columnStart = Math.floor(column / 3) * 3;

    for (let i = rowStart; i < rowStart + 3; i++) {
      for (let j = columnStart; j < columnStart + 3; j++) {
        if (board[i][j] === currNum && i !== row && j !== column) return false;
      }
    }

    // In case all 'if statements' were evaded return true

    return true;
  };

  const solver = () => {
    const emptyCell = zeroFinder(initBoard);

    // If no more empty cells - return true, puzzle solved

    if (!emptyCell) return true;

    // For loop to iterate from 1 to 10 and fill in empty spots

    for (let i = 1; i < 10; i++) {
      const isTrue = validate(i, emptyCell, initBoard);

      // Number is found - next number
      // Number is not found - replace zero w/ number we are iterating

      if (isTrue) {
        const [row, column] = emptyCell;
        initBoard[row][column] = i;

        // Recursive call to solve rest of the puzzle with current number
        // (refer to call stack in debugger)

        if (solver()) return true;

        // In case no numbers fit to solve - return false, comeback to previous call and put zero

        initBoard[row][column] = 0;
      }
    }
    return false;
  };
  solver();
  return initBoard;
}

function isSolved(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0) {
        return false;
      }
    }
  }
  return true;
}

function generateColor() {
  const gen = "#" + Math.floor(Math.random() * 16777215).toString(16);
  if (gen.length === 7) {
    return gen;
  }
  if (gen.length === 6) {
    return gen + "0";
  } else {
    return gen + "00";
  }
}
const color1 = generateColor();
const color2 = generateColor();


function prettyBoard(board) {
  const formaCfont = {
    vertical: ' ', // |
    border: '#', // ■✦#
    gorizont: '-', // ―
    space: '  ', // '·'
    margin: '          ',
    lineLength: function lineLen() {
      return this.space.length * 18 + 10 + 9;
      
    },
  };
  return boardDrawCfonts(board, formaCfont);
}

module.exports = {
  solve,
  isSolved,
  prettyBoard,
  boardDrawCfonts,
};
