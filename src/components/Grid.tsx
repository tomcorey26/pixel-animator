import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

import Tile from "./Tile";

const numRows = 20;
const numCols = 20;

const createGrid = (numRows: number, numCols: number) => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => "#ffffff"));
  }
  return rows;
};

const Grid: React.FC = () => {
  const [frames, setFrames] = useState<any>([]);
  const [grid, setGrid] = useState(() => {
    return createGrid(numRows, numCols);
  });
  const [running, setRunning] = useState(false);
  const [globalColor, setGlobalColor] = useState("#ffffff");

  const handleTileClick = (i: number, k: number) => {
    const newGrid: any = produce(grid, gridCopy => {
      console.log(globalColor);
      gridCopy[i][k] = grid[i][k] !== "#ffffff" ? "#ffffff" : globalColor;
    });
    setGrid(newGrid);
  };

  const createNewFrame = () => {
    setFrames([...frames, grid]);
    setGrid(createGrid(numRows, numCols));
  };

  const handleColorChange = (event: any) => {
    setGlobalColor(event.target.value);
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

      <input
        type="color"
        id="color"
        name="head"
        value={globalColor}
        onChange={handleColorChange}
      />

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
              onClick={() => handleTileClick(i, k)}
              color={grid[i][k]}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Grid;
