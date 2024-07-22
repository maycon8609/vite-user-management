import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { User } from "../../types";

interface EditUserProps {
  cancelEdit: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveChange: () => void;
  user: User | null;
}

export const EditUser = ({
  cancelEdit,
  handleChange,
  handleSaveChange,
  user,
}: EditUserProps) => {
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
