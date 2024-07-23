import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";

import { User } from "../../types";
import { useAuth, useUserManagement } from "../../hooks";

interface EditProfileProps {
  onClose: () => void;
  isOpen: boolean;
}

export const EditProfile: FC<EditProfileProps> = ({ onClose, isOpen }) => {
  const [user, setUser] = useState<User | null>(null);

  const { loggedUser } = useAuth();
  const { updateUser } = useUserManagement();

  useEffect(() => {
    setUser(loggedUser);
  }, [loggedUser]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  const handleCloseDialog = () => {
    onClose();
    setUser(loggedUser);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      {user && (
        <>
          <Box
            sx={{ m: 1, mt: 2 }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <img
              srcSet="https://picsum.photos/200?random=1"
              src="https://picsum.photos/200?random=1"
              alt="Imagem de perfil do usuario"
              loading="lazy"
              width={80}
              height={80}
              style={{
                borderRadius: "50%",
              }}
            />
            <Typography component="h1" variant="h5">
              {user!.name}
            </Typography>
          </Box>
          <DialogContent>
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
          </DialogContent>
        </>
      )}

      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSaveChange} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
