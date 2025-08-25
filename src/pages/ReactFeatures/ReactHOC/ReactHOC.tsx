import { Button, Typography } from "@mui/material";
import { withAuth } from "./withAuthHOC";
import { useState } from "react";

const getIsAuthText = (isAuth: boolean) => {
  return isAuth ? "Auth" : "Not Auth";
};

const AuthComponent = withAuth((props) => {
  return <div>AuthComponent {getIsAuthText(props.isAuth)}</div>;
});

const AuthComponent2 = withAuth((props) => {
  return <div>AuthComponent {getIsAuthText(props.isAuth)}</div>;
});

export const ReactHOC = () => {
  const [showAuthComponent, setShowAuthComponent] = useState(false);

  const handleToggleAuth = () => {
    localStorage.setItem("isAuth", showAuthComponent ? "false" : "true");
    setShowAuthComponent(!showAuthComponent);
  };

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
      <Typography variant="h6">ReactHOC</Typography>

      <Button onClick={handleToggleAuth}>Toggle Auth</Button>

      <div style={{ marginTop: 200 }}>
        {showAuthComponent ? <AuthComponent /> : <AuthComponent2 />}
      </div>
    </div>
  );
};
