import { Form, Field as RFField } from "react-final-form";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  TextField,
  Typography,
} from "@mui/material";

interface IFormFields {
  name: string;
}

export const FinalForm = () => {
  const handleSubmitForm = (data: IFormFields) => {
    console.log("handleSubmitForm data: ", data);
  };

  return (
    <div>
      <Typography variant="h3">Final Form</Typography>

      <Form<IFormFields> onSubmit={handleSubmitForm}>
        {({ handleSubmit, form }) => (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
          >
            <RFField<IFormFields> name="name">
              {({ input }) => <TextField {...input} label="Name" />}
            </RFField>

            <RFField type="checkbox" name="rememberMe">
              {({ input }) => (
                <FormControlLabel
                  control={<Checkbox {...input} />}
                  label="Remember me"
                />
              )}
            </RFField>

            <Box sx={{ display: "flex", gap: 2 }}>
              <RFField type="radio" name="gender" value="male">
                {({ input }) => (
                  <FormControlLabel
                    control={<Radio {...input} />}
                    label="Male"
                  />
                )}
              </RFField>

              <RFField type="radio" name="gender" value="female">
                {({ input }) => (
                  <FormControlLabel
                    control={<Radio {...input} />}
                    label="Female"
                  />
                )}
              </RFField>
            </Box>

            <Button variant="contained" type="submit">
              Submit
            </Button>
            <Button
              variant="outlined"
              type="button"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
          </form>
        )}
      </Form>
    </div>
  );
};
