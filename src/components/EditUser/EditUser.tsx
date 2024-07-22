import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { User } from "../../contexts";

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
      <DialogTitle>Edit User</DialogTitle>
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
        <Button onClick={cancelEdit} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveChange} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
