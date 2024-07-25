import { FC } from "react";
import {
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

import type { EditUserProps } from "./types";

export const EditUser: FC<EditUserProps> = ({
  "data-testid": datatestId = "edit-user",
  handleChange,
  handleSaveChange,
  onClose,
  user,
}) => {
  return (
    <Dialog
      open={!!user}
      onClose={onClose}
      data-testid={`${datatestId}--dialog`}
    >
      <DialogTitle data-testid={`${datatestId}--dialog-title`}>
        Editar usuario
      </DialogTitle>
      <DialogContent>
        {user && (
          <>
            <TextField
              data-testid={`${datatestId}--field-name`}
              fullWidth
              label="Nome"
              margin="dense"
              name="name"
              onChange={handleChange}
              value={user.name}
            />
            <TextField
              data-testid={`${datatestId}--field-email`}
              fullWidth
              label="E-mail"
              margin="dense"
              name="email"
              onChange={handleChange}
              value={user.email}
            />
            <TextField
              data-testid={`${datatestId}--field-password`}
              fullWidth
              label="Senha"
              margin="dense"
              name="password"
              onChange={handleChange}
              type="password"
              value={user.password}
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
                id="select"
                label="Tipo"
                labelId="select-label"
                name="type"
                onChange={handleChange}
                value={user.type}
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
        )}
      </DialogContent>

      <DialogActions>
        <Button
          color="primary"
          data-testid={`${datatestId}--cancel-button`}
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button
          color="primary"
          data-testid={`${datatestId}--save-button`}
          onClick={handleSaveChange}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
