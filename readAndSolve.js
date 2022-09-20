const sudoku = require('./sudoku');

function readAndSolve(fileData, error = null) {
  if (error) {
    throw error;
  }

  const puzzles = fileData
    .split('\n')
    .filter((line) => line !== '');

  let puzzleNumber = Number(process.argv[2]) || 1;

  if (puzzleNumber > puzzles.length) {
    puzzleNumber = puzzles.length;
  }

  const puzzle = puzzles[puzzleNumber - 1].replaceAll('-', '0');

  const neatBoard = () => {
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

    const unsolvedBoard = [
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

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        unsolvedBoard[i].push(Number(puzzle[i * 9 + j]));
      }
    }

    return sudoku.boardDrawCfonts(unsolvedBoard, formaCfont);
  };

  console.log(`
                            Решаем судоку №${puzzleNumber}:
            `);
  neatBoard();

  const solvedPuzzle = sudoku.solve(puzzle);

  if (!sudoku.isSolved(solvedPuzzle)) {
    console.log(`Не смогли решить судоку №${puzzleNumber} :(`, '\n');
    return;
  }

  console.log(`
                          Судоку №${puzzleNumber} решён успешно!
            `);

  return sudoku.prettyBoard(solvedPuzzle);
}

module.exports = readAndSolve;
