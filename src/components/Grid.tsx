import React, { useState, useEffect } from "react";
import produce from "immer";

import Point from "../interfaces/Point";
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
  const [frames, setFrames] = useState<Array<string[][]>>([]);
  const [grid, setGrid] = useState<string[][]>(() => {
    return createGrid(numRows, numCols);
  });
  const [running, setRunning] = useState(false);
  const [globalColor, setGlobalColor] = useState("#ffffff");
  const [isMouseDown, setMouseDown] = useState<boolean>(false);
  const [hoverTileCoords, setHoverTileCoords] = useState<Point | null>(null);

  const handleTileHold = (i: number, k: number) => {
    if (isMouseDown) {
      const newGrid: any = produce(grid, gridCopy => {
        console.log(globalColor);
        gridCopy[i][k] = globalColor;
      });
      setGrid(newGrid);
    }
  };

  const createNewFrame = () => {
    setFrames([...frames, grid]);
    setGrid(createGrid(numRows, numCols));
  };

  const fillWithColor = () => {
    const newGrid: any = produce(grid, gridCopy => {
      gridCopy.forEach((rows, i) => {
        rows.forEach((col, k) => (gridCopy[i][k] = globalColor));
      });
    });
    setGrid(newGrid);
  };

  const handleColorChange = (event: any) => {
    setGlobalColor(event.target.value);
  };

  useEffect(() => {
    if (hoverTileCoords !== null) {
      handleTileHold(hoverTileCoords.x, hoverTileCoords.y);
    }

    return;
  }, [isMouseDown, hoverTileCoords]);

  return (
    <>
      <button
        onClick={() => {
          createNewFrame();
        }}
      >
        Next Frame
      </button>

      <button
        onClick={() => {
          fillWithColor();
        }}
      >
        Fill
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
              onMouseOver={() => setHoverTileCoords({ x: i, y: k })}
              onMouseDown={() => setMouseDown(true)}
              onMouseUp={() => setMouseDown(false)}
              color={grid[i][k]}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Grid;
