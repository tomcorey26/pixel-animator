import React from "react";

interface Props {
  i: number;
  k: number;
  isFilled: number;
  onClick: any;
}

const Tile: React.FC<Props> = ({ onClick, isFilled }) => {
  return (
    <div
      onClick={onClick}
      style={{
        width: 20,
        height: 20,
        backgroundColor: isFilled ? "pink" : undefined,
        border: "solid 1px black"
      }}
    />
  );
};

export default Tile;
