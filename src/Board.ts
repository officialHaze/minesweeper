export default class Board {
  private rows: number;
  private cols: number;

  private grid: number[][] = [];

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
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
        // Create a column element
        const tableCol = document.createElement("td");
        tableCol.innerText = "testing";
        // Append the row to the column
        tableRow.appendChild(tableCol);
      }
    }
  }

  public reset() {
    // Fill all the positions in the board with 1
  }
}
