import { FC } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAuth } from "@/hooks";
import type { HomeHeaderProps } from "./types";

export const HomeHeader: FC<HomeHeaderProps> = ({
  "data-testid": datatestId = "home-header",
  user,
  handleAddUser,
  handleEditProfile,
}) => {
  const { signOut } = useAuth();

  return (
    <Box
      data-testid={`${datatestId}--container`}
      component="header"
      display="flex"
      justifyContent="space-between"
      gap={2}
      sx={{
        mb: 2,
      }}
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

      <Box display="flex" gap={3}>
        {user && user.type === "ADMIN" && (
          <Box
            data-testid={`${datatestId}--add-user--container`}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            onClick={handleAddUser}
            style={{
              cursor: "pointer",
            }}
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
            >
              <AddIcon />
            </IconButton>
          </Box>
        )}

        <Box
          data-testid={`${datatestId}--logout--container`}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          onClick={signOut}
          style={{
            cursor: "pointer",
          }}
        >
          <Typography
            component="h1"
            data-testid={`${datatestId}--logout--title`}
            variant="h5"
          >
            Sair
          </Typography>

          <IconButton
            data-testid={`${datatestId}--logout--icon`}
            edge="end"
            aria-label="logout"
          >
            <LogoutIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
