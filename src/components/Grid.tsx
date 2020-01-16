import React from "react";
import Tile from "./Tile";

interface Props {
  grid: any;
  setHoverTileCoords: any;
  setMouseDown: any;
  numCols: number;
}

const Grid: React.FC<Props> = ({
  grid,
  numCols,
  setHoverTileCoords,
  setMouseDown
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numCols},20px)`
      }}
    >
      {grid.map((rows: any, i: number) =>
        rows.map((col: any, k: number) => (
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
  );
};

export default Grid;
