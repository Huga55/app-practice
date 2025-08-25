import { memo } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const HeaderComponent = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="h5" component="h1" fontWeight="bold">
          JS Practice
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export const Header = memo(HeaderComponent);
