import { ChangeEvent, FC, useState } from "react";
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
import { EditProfile } from "../../components/EditProfile";
import { EditUser } from "../../components/EditUser";
import { HomeHeader } from "../../components/HomeHeader";

import { useAuth, useUserManagement } from "../../hooks";
import { User } from "../../types";

export const Home: FC = () => {
  const [editUser, setEditUser] = useState<User | null>(null);
  const [addUser, setAddUser] = useState(false);
  const [editProfile, setEditProfile] = useState(false);

  const { loggedUser } = useAuth();
  const { users, createUser, deleteUser, updateUser } = useUserManagement();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  return (
    <Container
      component="main"
      sx={{
        p: 3,
      }}
    >
      <Box>
        <List
          subheader={
            <HomeHeader
              userName={loggedUser!.name}
              handleEditProfile={() => setEditProfile(true)}
              handleAddUser={() => setAddUser(true)}
            />
          }
        >
          {users.map((user) => {
            if (user.id !== loggedUser!.id) {
              return (
                <ListItem key={user.id} divider>
                  <img
                    srcSet={`https://picsum.photos/200?random=${user.id}`}
                    src={`https://picsum.photos/200?random=${user.id}`}
                    alt="Imagem de perfil do usuario"
                    loading="lazy"
                    width={40}
                    height={40}
                    style={{
                      borderRadius: "50%",
                      marginRight: "16px",
                    }}
                  />

                  <ListItemText
                    secondary={user.type}
                    style={{ maxWidth: "100px" }}
                  />

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
              );
            }
          })}
        </List>

        <EditUser
          cancelEdit={() => setEditUser(null)}
          handleSaveChange={handleSaveChange}
          handleChange={handleChange}
          user={editUser}
        />

        <EditProfile
          handleClose={() => setEditProfile(false)}
          handleSaveChange={handleSaveChange}
          handleChange={handleChange}
          user={loggedUser}
          isOpen={editProfile}
        />

        <AddUser
          handleClose={() => setAddUser(false)}
          handleSaveChange={(user) => createUser(user)}
          isOpen={addUser}
        />
      </Box>
    </Container>
  );
};
