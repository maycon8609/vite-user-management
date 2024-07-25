import { ChangeEvent, FC, useState } from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Container,
  SelectChangeEvent,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { AddUser } from "@/components/AddUser";
import { EditProfile } from "@/components/EditProfile";
import { EditUser } from "@/components/EditUser";
import { HomeHeader } from "@/components/HomeHeader";

import { useAuth, useUserManagement } from "@/hooks";
import type { User } from "@/global/types";

export const Home: FC = () => {
  const [editProfile, setEditProfile] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openAddUser, setOpenAddUser] = useState(false);

  const { loggedUser } = useAuth();
  const { users, deleteUser, updateUser, createUser } = useUserManagement();

  // EditUser
  const handleChangeToEditUser = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = event.target;

    if (editUser) {
      setEditUser({ ...editUser, [name]: value });
    }
  };

  const handleSaveChangeToEditUser = () => {
    if (editUser) {
      updateUser(editUser);
      setEditUser(null);
    }
  };

  // EditProfile
  const handleChangeToEditProfile = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    if (editProfile) {
      setEditProfile({ ...editProfile, [name]: value });
    }
  };

  const handleSaveChangesToEditProfile = () => {
    if (editProfile) {
      updateUser(editProfile);
      setEditProfile(null);
    }
  };

  // AddUser
  const handleCloseAddUser = () => {
    setErrorMessage(null);
    setOpenAddUser(false);
  };

  const handleSaveChangesToAddUser = (user: Omit<User, "id">) => {
    const response = createUser(user);

    if (response) {
      setErrorMessage(response.errorMessage);
    } else {
      handleCloseAddUser();
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
              handleEditProfile={() => setEditProfile(loggedUser)}
              handleAddUser={() => setOpenAddUser(true)}
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

                  {loggedUser!.type === "ADMIN" && (
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
                  )}
                </ListItem>
              );
            }
          })}
        </List>

        <EditUser
          handleChange={handleChangeToEditUser}
          handleSaveChange={handleSaveChangeToEditUser}
          onClose={() => setEditUser(null)}
          user={editUser}
        />

        <EditProfile
          handleChange={handleChangeToEditProfile}
          handleSaveChanges={handleSaveChangesToEditProfile}
          onClose={() => setEditProfile(null)}
          user={editProfile}
        />

        <AddUser
          createUser={handleSaveChangesToAddUser}
          errorMessage={errorMessage}
          isOpen={openAddUser}
          onClose={handleCloseAddUser}
        />
      </Box>
    </Container>
  );
};
