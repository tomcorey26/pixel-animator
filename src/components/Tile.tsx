import React, { useState } from "react";

interface Props {
  isFilled: string;
  onMouseOver: () => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
  color: string;
}

const Tile: React.FC<Props> = ({
  onMouseOver,
  isFilled,
  color,
  onMouseDown,
  onMouseUp
}) => {
  return (
    <div
      onMouseOver={onMouseOver}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      style={{
        width: 20,
        height: 20,
        backgroundColor: isFilled ? color : undefined,
        border: "solid 1px black"
      }}
    />
  );
};

export default Tile;
