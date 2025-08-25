import { Button, Typography } from "@mui/material";
import { lazy, Suspense, useState } from "react";

const AboutPage = lazy(() => import("./About"));

export const ReactLazy = () => {
  const [showAbout, setShowAbout] = useState(false);

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
      <Typography variant="h6">ReactLazy</Typography>
      <div style={{ marginTop: 200 }}>
        {!showAbout && (
          <Button onClick={() => setShowAbout(true)}>Show About</Button>
        )}
        {showAbout && (
          <Suspense fallback={<div>Loading...</div>}>
            <AboutPage />
          </Suspense>
        )}
      </div>
    </div>
  );
};
