import { ChangeEvent, FC, useEffect, useState } from "react";
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

import { useUserManagement } from "../../hooks";
import { User } from "../../types";

interface EditUserProps {
  onClose: () => void;
  user: User | null;
}

export const EditUser: FC<EditUserProps> = ({ onClose, user: data }) => {
  const [user, setUser] = useState<User | null>(data);

  const { updateUser } = useUserManagement();

  useEffect(() => {
    setUser(data);
  }, [data]);

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = event.target;

    if (user) {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSaveChange = () => {
    if (user) {
      updateUser(user);
      onClose();
    }
  };

  return (
    <Dialog open={!!user} onClose={onClose}>
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
                onChange={handleChange}
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
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSaveChange} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
