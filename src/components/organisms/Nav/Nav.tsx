import { memo, type FC } from "react";
import { Link as RouterLink, useLocation } from "react-router";
import { Box, Link, List, ListItem, Paper } from "@mui/material";

interface INavProps {
  routes: Record<string, string>;
}

const NavComponent: FC<INavProps> = ({ routes }) => {
  const location = useLocation();

  return (
    <Box component="nav" sx={{ padding: 2 }}>
      <Paper elevation={3}>
        <List
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            padding: 2,
          }}
        >
          {Object.entries(routes).map(([key, value]) => (
            <ListItem key={key} sx={{ width: "auto", padding: 0 }}>
              <Link
                component={RouterLink}
                to={value}
                sx={{
                  textTransform: "capitalize",
                  padding: "8px 16px",
                  borderRadius: 1,
                  backgroundColor:
                    location.pathname === value
                      ? "action.selected"
                      : "transparent",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                {key}
              </Link>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export const Nav = memo(NavComponent);
