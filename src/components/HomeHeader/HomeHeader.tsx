import { FC } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import type { HomeHeaderProps } from "./types";

export const HomeHeader: FC<HomeHeaderProps> = ({
  "data-testid": datatestId = "home-header",
  user,
  handleAddUser,
  handleEditProfile,
}) => {
  return (
    <Box
      data-testid={`${datatestId}--container`}
      component="header"
      display="flex"
      justifyContent="space-between"
      gap={2}
    >
      <Box
        component="div"
        data-testid={`${datatestId}--profile-container`}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
        onClick={handleEditProfile}
        style={{
          cursor: "pointer",
        }}
      >
        <img
          alt="Imagem de perfil do usuario"
          data-testid={`${datatestId}--profile-image`}
          height={40}
          loading="lazy"
          src="https://picsum.photos/200?random=1"
          srcSet="https://picsum.photos/200?random=1"
          width={40}
          style={{
            borderRadius: "50%",
          }}
        />

        <Typography
          component="h1"
          data-testid={`${datatestId}--profile-name`}
          variant="h5"
        >
          {user && user.name}
        </Typography>
      </Box>

      {user && user.type === "ADMIN" && (
        <Box
          data-testid={`${datatestId}--add-user--container`}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Typography
            component="h1"
            data-testid={`${datatestId}--add-user--title`}
            variant="h5"
          >
            Adicionar usuario
          </Typography>

          <IconButton
            data-testid={`${datatestId}--add-user--icon`}
            edge="end"
            aria-label="add"
            onClick={handleAddUser}
          >
            <AddIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};
