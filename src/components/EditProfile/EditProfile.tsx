import { FC } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";

import type { EditProfileProps } from "./types";

export const EditProfile: FC<EditProfileProps> = ({
  "data-testid": datatestId = "edit-profile",
  handleChange,
  handleSaveChange,
  onClose,
  user,
}) => {
  return (
    <Dialog
      data-testid={`${datatestId}--dialog`}
      onClose={onClose}
      open={!!user}
    >
      {user && (
        <>
          <Box
            data-testid={`${datatestId}--user-container`}
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            sx={{ m: 1, mt: 2 }}
          >
            <img
              alt="Imagem de perfil do usuario"
              data-testid={`${datatestId}--image-profile`}
              height={80}
              loading="lazy"
              src="https://picsum.photos/200?random=1"
              srcSet="https://picsum.photos/200?random=1"
              style={{
                borderRadius: "50%",
              }}
              width={80}
            />
            <Typography
              component="h1"
              data-testid={`${datatestId}--user-name`}
              variant="h5"
            >
              {user.name}
            </Typography>
          </Box>
          <DialogContent>
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
            </>
          </DialogContent>
        </>
      )}

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
