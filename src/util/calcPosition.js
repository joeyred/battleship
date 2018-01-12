function calcPosition(cellSize, coordinates) {
  // let xPosition = cellSize * coordinates[0];
  // let yPosition = cellSize * coordinates[1];
  return [cellSize * coordinates[0], cellSize * coordinates[1]];
}

export default calcPosition;
