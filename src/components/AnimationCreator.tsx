import React, { useState, useEffect, useRef, useCallback } from "react";
import produce from "immer";

import Point from "../interfaces/Point";
import Grid from "../components/Grid";
const numRows = 20;
const numCols = 20;

const createGrid = (numRows: number, numCols: number) => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => "#ffffff"));
  }
  return rows;
};

const AnimationCreator: React.FC = () => {
  const [frameIdx, setFrameIdx] = useState<number>(0);
  const [running, setRunning] = useState(false);
  const [frames, setFrames] = useState<Array<string[][]>>([
    createGrid(numRows, numCols)
  ]);
  const [globalColor, setGlobalColor] = useState("#000000");
  const [isMouseDown, setMouseDown] = useState<boolean>(false);
  const [hoverTileCoords, setHoverTileCoords] = useState<Point | null>(null);

  const handleTileHold = (i: number, k: number) => {
    if (isMouseDown) {
      const newFrame: any = produce(frames, framesCopy => {
        framesCopy[frameIdx][i][k] = globalColor;
      });
      setFrames(newFrame);
    }
  };

  const runningRef = useRef(running);
  runningRef.current = running;

  const playAnimation = () => {
    if (!runningRef.current) {
      return;
    }
    setFrameIdx(prevFrame => (prevFrame + 1) % frames.length);
    setTimeout(playAnimation, 1000);
  };

  const createNewFrame = () => {
    setFrameIdx(prev => (prev += 1));
    setFrames([...frames, createGrid(numRows, numCols)]);
  };

  const fillWithColor = () => {
    const newFrames: any = produce(frames, framesCopy => {
      framesCopy[frameIdx].forEach((rows, i) => {
        rows.forEach((col, k) => (framesCopy[frameIdx][i][k] = globalColor));
      });
    });
    setFrames(newFrames);
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

  const isForwardShowing = frameIdx !== frames.length - 1;
  const isBackwardShowing = frameIdx !== 0;
  return (
    <>
      <h1>Current Frame {frameIdx}</h1>
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

      {isBackwardShowing && (
        <button
          onClick={() => {
            setFrameIdx(prev => (prev -= 1));
          }}
        >
          Backward
        </button>
      )}

      {isForwardShowing && (
        <button
          onClick={() => {
            setFrameIdx(prev => (prev += 1));
          }}
        >
          Forward
        </button>
      )}

      <input
        type="color"
        id="color"
        name="head"
        value={globalColor}
        onChange={handleColorChange}
      />

      <button
        style={{ backgroundColor: "orange" }}
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            playAnimation();
          }
        }}
      >
        Play Animation
      </button>

      <>
        <Grid
          grid={frames[frameIdx]}
          setHoverTileCoords={setHoverTileCoords}
          setMouseDown={setMouseDown}
          numCols={numCols}
        />
      </>
    </>
  );
};

function useGrid() {}

export default AnimationCreator;
