import { Box, Button, TextField, Typography } from "@mui/material";
import { UserProvider } from "./context/UserProvider";
import { useUserContext } from "./context/useUserContext";
import { Field, Form } from "react-final-form";
import type { IUserInfo } from "./context/UserContext";

const ReactContextComponent = () => {
  const { userInfo, changeUserInfo } = useUserContext();

  const handleSubmit = (values: IUserInfo) => {
    changeUserInfo(values);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={userInfo || { name: "", age: 0 }}
    >
      {({ handleSubmit: formHandleSubmit }) => (
        <form onSubmit={formHandleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Field name="name">
              {({ input }) => (
                <TextField
                  {...input}
                  label="Имя"
                  variant="outlined"
                  fullWidth
                />
              )}
            </Field>

            <Field name="age">
              {({ input }) => (
                <TextField
                  {...input}
                  label="Возраст"
                  type="number"
                  variant="outlined"
                  fullWidth
                />
              )}
            </Field>

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Сохранить
            </Button>
          </Box>
        </form>
      )}
    </Form>
  );
};

const UserInfo = () => {
  const { userInfo } = useUserContext();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
      <Typography variant="h6">Имя: {userInfo?.name}</Typography>
      <Typography variant="h6">Возраст: {userInfo?.age}</Typography>
    </Box>
  );
};

export const ReactContextWrapper = () => {
  return (
    <UserProvider>
      <ReactContextComponent />
      <UserInfo />
    </UserProvider>
  );
};
