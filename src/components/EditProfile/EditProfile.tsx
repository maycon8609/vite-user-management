import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
import { User } from "../../contexts";

interface EditProfileProps {
  handleClose: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveChange: () => void;
  user: User | null;
  isOpen: boolean;
}

export const EditProfile = ({
  handleClose,
  handleChange,
  handleSaveChange,
  user,
  isOpen,
}: EditProfileProps) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
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
        {user && (
          <>
            <TextField
              margin="dense"
              label="Name"
              name="name"
              fullWidth
              value={user.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Email"
              name="email"
              fullWidth
              value={user.email}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Password"
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
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveChange} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
