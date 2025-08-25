import { Typography } from "@mui/material";
import { useState, type MouseEvent } from "react";

interface IPosition {
  x: number;
  y: number;
}

interface MouseTracker {
  children: (position: IPosition) => React.ReactNode;
}

const MouseTracker = ({ children }: MouseTracker) => {
  const [position, setPosition] = useState<IPosition>({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (event: MouseEvent) => {
    setPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleMouseLeave = () => {
    setPosition({
      x: 0,
      y: 0,
    });
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {children(position)}

      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      ></div>
    </div>
  );
};

export const ReactRenderProps = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h6">ReactRenderProps</Typography>
      <MouseTracker>
        {({ x, y }) => (
          <div
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: "50px",
              height: "50px",
              backgroundColor: "red",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: -1,
            }}
          />
        )}
      </MouseTracker>
    </div>
  );
};
