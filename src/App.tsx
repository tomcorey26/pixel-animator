import React from "react";
import AnimationCreator from "./components/AnimationCreator";
import "./styles.scss";

const App: React.FC = () => {
  return (
    <div
      className="app"
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <div className="container">
        <AnimationCreator />
      </div>
    </div>
  );
};

export default App;
