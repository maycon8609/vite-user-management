import { FC } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import type { HomeHeaderProps } from "./types";

export const HomeHeader: FC<HomeHeaderProps> = ({
  user,
  handleAddUser,
  handleEditProfile,
}) => {
  return (
    <Box
      component="header"
      display="flex"
      justifyContent="space-between"
      gap={2}
    >
      <Box
        display="flex"
        component="div"
        justifyContent="space-between"
        alignItems="center"
        gap={1}
        onClick={handleEditProfile}
        style={{
          cursor: "pointer",
        }}
      >
        <img
          srcSet="https://picsum.photos/200?random=1"
          src="https://picsum.photos/200?random=1"
          alt="Imagem de perfil do usuario"
          loading="lazy"
          width={40}
          height={40}
          style={{
            borderRadius: "50%",
          }}
        />

        <Typography component="h1" variant="h5">
          {user && user.name}
        </Typography>
      </Box>

      {user && user.type === "ADMIN" && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Typography component="h1" variant="h5">
            Adicionar usuario
          </Typography>

          <IconButton edge="end" aria-label="add" onClick={handleAddUser}>
            <AddIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};
