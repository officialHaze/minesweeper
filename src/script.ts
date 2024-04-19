class Board {
  private rows: number;
  private cols: number;

  private grid: number[][] = [];

  private mineRows: number[] = [];
  private mineCols: number[] = [];

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
  }

  public createMines(totalMines: number) {
    console.log({ totalMines });
    // For every mine create a new random position
    if (totalMines > 0) {
      const { mineRow, mineCol } = this.generateRandomMinePos();

      if (!this.mineRows.includes(mineRow) && !this.mineCols.includes(mineCol)) {
        this.mineRows[mineRow] = 2;
        this.mineCols[mineCol] = 2;
        this.createMines(totalMines - 1);
      } else {
        this.createMines(totalMines);
      }
    }
  }

  // Generate a random position for the mine
  private generateRandomMinePos() {
    const randomRow = Math.floor(Math.random() * this.rows);
    console.log(randomRow);

    const randomCol = Math.floor(Math.random() * this.cols);
    console.log(randomCol);

    // this.mineRow = randomRow;
    // this.mineCol = randomCol;

    return { mineRow: randomRow, mineCol: randomCol };
  }

  private handleCellClick(thisCell: HTMLTableCellElement, ev: MouseEvent) {
    const currentRowStr: string | undefined = thisCell.getAttribute("id")?.split("-")[0];
    const currentRow = currentRowStr ? parseInt(currentRowStr) : 0;

    const currentColStr = thisCell.getAttribute("id")?.split("-")[1];
    const currentCol = currentColStr ? parseInt(currentColStr) : 0;

    console.log("Mine positions: ", this.mineRows, this.mineCols);

    if (this.mineRows[currentRow] === 2 && this.mineCols[currentCol] === 2) {
      thisCell.innerText = "0";
      alert("Game Over");
      return;
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
        cell.setAttribute("id", `${i}-${j}`); // id = row-col
        cell.innerText = "x";
        // Append the cell to the row
        tableRow.appendChild(cell);

        // For every cell listen to any click event and handle it accordingly
        cell.addEventListener("click", (ev) => this.handleCellClick(cell, ev));
      }
    }
  }

  public reset() {
    // Refresh the page
    window.location.reload();
  }
}

const board = new Board(3, 3); // create a new board with 3 x 3 dimensions
board.draw();
board.createMines(2);
