import type { FormEvent } from "react";
import {
  Box,
  Paper,
  Stack,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Radio,
} from "@mui/material";

const NativeForms = () => {
  const handleByFormData = (form: HTMLFormElement) => {
    const formData = new FormData(form);

    formData.forEach((value, key) => {
      console.log("handleByFormData", key, value);
    });
  };

  const handleByElements = (form: HTMLFormElement) => {
    const elements = form.elements;

    const fieldElements = Array.from(elements).filter(
      (element) => element.name
    );

    const data: Record<string, string> = {};

    fieldElements.forEach((element) => {
      if (element.type === "checkbox") {
        data[element.name] = String(element.checked);
        return;
      }

      if (element.type === "radio") {
        if (element.checked) {
          data[element.name] = element.value;
        }
        return;
      }

      data[element.name] = element.value;
    });

    console.log("handleByElements data: ", data);

    const searchParams = new URLSearchParams(data);

    console.log("handleByElements searchParams: ", searchParams.toString());

    form.reset();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form =
      e.target instanceof HTMLFormElement
        ? e.target
        : (document.forms.mainForm as HTMLFormElement);

    if (!form.checkValidity()) {
      console.log("form is not valid");
      return;
    }

    handleByFormData(form);
    handleByElements(form);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <form name="mainForm" method="GET" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField fullWidth name="name" label="Имя" variant="outlined" />

            <TextField
              fullWidth
              name="message"
              label="Сообщение"
              multiline
              rows={4}
            />

            <FormControl fullWidth>
              <InputLabel>Выберите число</InputLabel>
              <Select name="select" label="Выберите число">
                {[1, 2, 3].map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Радио опции</FormLabel>
              <RadioGroup name="radio" row>
                {[1, 2, 3].map((value) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControlLabel
              control={<Checkbox name="checkbox" />}
              label="Чекбокс"
            />

            <Button type="submit" variant="contained" size="large">
              Отправить
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default NativeForms;
