import { ChangeEvent, FC } from "react";
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
  SelectChangeEvent,
  TextField,
} from "@mui/material";

import { User } from "../../types";

interface EditUserProps {
  cancelEdit: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveChange: () => void;
  user: User | null;
}

export const EditUser: FC<EditUserProps> = ({
  cancelEdit,
  handleChange,
  handleSaveChange,
  user,
}) => {
  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    handleChange({
      target: {
        name,
        value,
      },
    } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <Dialog open={!!user} onClose={cancelEdit}>
      <DialogTitle>Editar usuario</DialogTitle>
      <DialogContent>
        {user && (
          <>
            <TextField
              margin="dense"
              label="Nome"
              name="name"
              fullWidth
              value={user.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="E-mail"
              name="email"
              fullWidth
              value={user.email}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Senha"
              name="password"
              type="password"
              fullWidth
              value={user.password}
              onChange={handleChange}
            />

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="select-label">Tipo</InputLabel>
              <Select
                id="select"
                label="Tipo"
                labelId="select-label"
                name="type"
                onChange={handleSelectChange}
                value={user.type}
              >
                <MenuItem value="USER">USER</MenuItem>
                <MenuItem value="ADMIN">ADMIN</MenuItem>
              </Select>
            </FormControl>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={cancelEdit} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSaveChange} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
