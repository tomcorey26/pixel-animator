import React, { useState } from "react";

interface Props {
  isFilled: string;
  onClick: () => void;
  color: string;
}

const Tile: React.FC<Props> = ({ onClick, isFilled, color }) => {
  return (
    <div
      onClick={onClick}
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
