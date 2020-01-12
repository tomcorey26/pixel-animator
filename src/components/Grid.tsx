import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

import Tile from "./Tile";

const numRows = 20;
const numCols = 20;

const createGrid = (numRows: number, numCols: number) => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

const Grid: React.FC = () => {
  const [frames, setFrames] = useState<any>([]);
  const [grid, setGrid] = useState(() => {
    return createGrid(numRows, numCols);
  });
  const [running, setRunning] = useState(false);

  const handleTileClick = (i: number, k: number) => {
    const newGrid = produce(grid, gridCopy => {
      gridCopy[i][k] = grid[i][k] ? 0 : 1;
    });
    setGrid(newGrid);
  };

  const createNewFrame = () => {
    setFrames([...frames, grid]);
    setGrid(createGrid(numRows, numCols));
  };

  return (
    <>
      <button
        onClick={() => {
          createNewFrame();
        }}
      >
        Next Frame
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols},20px)`
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <Tile
              key={`${i}-${k}`}
              isFilled={grid[i][k]}
              i={i}
              k={k}
              onClick={() => handleTileClick(i, k)}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Grid;
