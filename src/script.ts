class Board {
  private rows: number;
  private cols: number;

  private mineInRows: number[] = [];
  private mineInCols: number[] = [];

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
  }

  public addMines(totalMines: number) {
    console.log({ totalMines });

    if (totalMines > 0) {
      const { mineRow, mineCol } = this.generateRandomMinePos();
      if (!this.mineInRows.includes(mineRow) && !this.mineInCols.includes(mineCol)) {
        this.mineInRows.push(mineRow);
        this.mineInCols.push(mineCol);
        this.addMines(--totalMines);
      } else {
        this.addMines(totalMines);
      }
    }
  }

  // Generate a random position for the mine
  private generateRandomMinePos() {
    const randomRow = Math.floor(Math.random() * this.rows);
    // console.log(randomRow);

    const randomCol = Math.floor(Math.random() * this.cols);
    // console.log(randomCol);

    return { mineRow: randomRow, mineCol: randomCol };
  }

  private handleCellClick(thisCell: HTMLTableCellElement, ev: MouseEvent) {
    const currentRowStr: string | undefined = thisCell.getAttribute("id")?.split("-")[0];
    const currentRow = currentRowStr ? parseInt(currentRowStr) : 0;

    const currentColStr = thisCell.getAttribute("id")?.split("-")[1];
    const currentCol = currentColStr ? parseInt(currentColStr) : 0;

    // console.log(this.mineInRows, this.mineInCols);

    if (this.mineInRows.includes(currentRow)) {
      // Get the idx of the position of mine in row
      const idxOfMineInRow = this.mineInRows.indexOf(currentRow);
      // At the same idx in the mine in cols array, there should be a value
      // reprsenting the col number
      const colNum = this.mineInCols[idxOfMineInRow];

      // If this col number is equal to the current col
      // then its a mine
      if (colNum === currentCol) {
        thisCell.innerText = "0";
        alert("Game Over");
        return;
      }
    }

    thisCell.innerText = "1";
  }

  // Draw the board
  public draw() {
    // Get the game table parent element
    const parentTable = document.getElementById("game-table");

    for (let i = 0; i < this.rows; i++) {
      // Create a row element
      const tableRow = document.createElement("tr");
      // Append the row to the main table
      parentTable?.appendChild(tableRow);

      for (let j = 0; j < this.cols; j++) {
        // Create a cell
        const cell = document.createElement("td");
        cell.setAttribute("id", `${i}-${j}`); // id = row-col. Current row and col
        cell.innerText = "x";
        // Append the cell to the row
        tableRow.appendChild(cell);

        // For every cell listen to any click event and handle it accordingly
        cell.addEventListener("click", ev => this.handleCellClick(cell, ev));
      }
    }
  }

  public reset() {
    // Refresh the page
    window.location.reload();
  }
}

class Game {
  public static start() {
    const board = new Board(4, 4); // create a new board with 4 x 4 dimensions
    board.draw();
    board.addMines(4); // Add 4 mines
  }
}

// Start the game
Game.start();
