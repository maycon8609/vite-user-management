import { FC, FormEvent, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { useUserManagement } from "../../hooks";

import type { AddUserProps } from "./types";

export const AddUser: FC<AddUserProps> = ({
  "data-testid": datatestId = "add-user",
  onClose,
  isOpen,
}) => {
  const [error, setError] = useState<string | null>(null);

  const { createUser } = useUserManagement();

  const onCloseDialog = () => {
    setError(null);
    onClose();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const type = data.get("type") as "ADMIN" | "USER";

    const newUser = {
      name,
      email,
      password,
      type,
    };

    const response = createUser(newUser);

    if (response) {
      setError(response.errorMessage);
    } else {
      onCloseDialog();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onCloseDialog} data-testid={`${datatestId}--dialog`}>
      <DialogTitle data-testid={`${datatestId}--dialog-title`}>
        Adicionar usuario
      </DialogTitle>

      {error && (
        <Alert
          data-testid={`${datatestId}--alert`}
          severity="error"
          sx={{ m: 3, mt: 0, mb: 0 }}
        >
          {error}
        </Alert>
      )}

      <Box
        component="form"
        data-testid={`${datatestId}--form`}
        onSubmit={handleSubmit}
      >
        <DialogContent>
          <>
            <TextField
              autoComplete="name"
              autoFocus
              data-testid={`${datatestId}--field-name`}
              fullWidth
              id="name"
              label="Nome"
              margin="dense"
              name="name"
              required
            />
            <TextField
              autoComplete="email"
              data-testid={`${datatestId}--field-email`}
              fullWidth
              id="email"
              label="E-mail"
              margin="dense"
              name="email"
              required
            />
            <TextField
              autoComplete="password"
              data-testid={`${datatestId}--field-password`}
              fullWidth
              id="password"
              label="Senha"
              margin="dense"
              name="password"
              required
              type="password"
            />

            <FormControl
              data-testid={`${datatestId}--form-control`}
              fullWidth
              sx={{ mt: 2 }}
            >
              <InputLabel
                data-testid={`${datatestId}--form-control--input-label`}
                id="select-label"
              >
                Tipo
              </InputLabel>
              <Select
                data-testid={`${datatestId}--form-control--select`}
                defaultValue="USER"
                id="select"
                label="Tipo"
                labelId="select-label"
                name="type"
              >
                <MenuItem
                  data-testid={`${datatestId}--menu-item--user`}
                  value="USER"
                >
                  USER
                </MenuItem>
                <MenuItem
                  data-testid={`${datatestId}--menu-item--admin`}
                  value="ADMIN"
                >
                  ADMIN
                </MenuItem>
              </Select>
            </FormControl>
          </>
        </DialogContent>

        <DialogActions>
          <Button
            color="primary"
            data-testid={`${datatestId}--cancel-button`}
            onClick={onCloseDialog}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            data-testid={`${datatestId}--save-button`}
            type="submit"
          >
            Salvar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
