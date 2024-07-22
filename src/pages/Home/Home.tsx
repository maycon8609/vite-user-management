import React, { useState } from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Container,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { AddUser } from "../../components/AddUser";
import { EditUser } from "../../components/EditUser";
import { HomeHeader } from "../../components/HomeHeader";

import { useUserManagement } from "../../hooks";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const Home: React.FC = () => {
  const [editUser, setEditUser] = useState<User | null>(null);
  const [addUser, setAddUser] = useState(false);

  const { users, createUser, deleteUser, updateUser } = useUserManagement();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editUser) {
      setEditUser({ ...editUser, [event.target.name]: event.target.value });
    }
  };

  const handleSaveChange = () => {
    if (editUser) {
      updateUser(editUser);
      setEditUser(null);
    }
  };

  const cancelEdit = () => {
    setEditUser(null);
  };

  return (
    <Container
      component="main"
      style={{
        padding: 24,
      }}
    >
      <Box>
        <List subheader={<HomeHeader handleAddUser={() => setAddUser(true)} />}>
          {users.map((user) => (
            <ListItem key={user.id} divider>
              <ListItemText primary={user.name} secondary={user.email} />
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="edit"
                  onClick={() => setEditUser(user)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteUser(user.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <EditUser
          cancelEdit={cancelEdit}
          handleSaveChange={handleSaveChange}
          handleChange={handleChange}
          user={editUser}
        />

        <AddUser
          handleClose={() => setAddUser(false)}
          handleSaveChanges={(user) => createUser(user)}
          isOpen={addUser}
        />
      </Box>
    </Container>
  );
};
