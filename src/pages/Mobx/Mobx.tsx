import { observer } from "mobx-react";
import { timerStore } from "./TimerStore";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  PlayArrow as PlayArrowIcon,
  Stop as StopIcon,
  RestartAlt as RestartAltIcon,
} from "@mui/icons-material";

const MobxComponent = () => {
  const { seconds, isRunning, start, stop, reset } = timerStore;

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="h3" component="h1">
        Таймер: {seconds} сек.
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          onClick={start}
          disabled={isRunning}
          startIcon={<PlayArrowIcon />}
        >
          Старт
        </Button>
        <Button
          variant="contained"
          onClick={stop}
          disabled={!isRunning}
          startIcon={<StopIcon />}
        >
          Стоп
        </Button>
        <Button
          variant="outlined"
          onClick={reset}
          startIcon={<RestartAltIcon />}
        >
          Сброс
        </Button>
      </Stack>
    </Box>
  );
};

export const Mobx = observer(MobxComponent);
