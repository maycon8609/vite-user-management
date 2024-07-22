import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface HomeHeaderProps {
  handleAddUser: () => void;
}

export const HomeHeader = ({ handleAddUser }: HomeHeaderProps) => {
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
        onClick={() => console.log('test')}
        style={{
          cursor: 'pointer'
        }}
      >
        <img
          srcSet="https://placehold.co/60?text=User&font=roboto"
          src="https://placehold.co/60?text=User&font=roboto"
          alt="Imagem de perfil do usuario"
          loading="lazy"
          width={40}
          height={40}
          style={{
            borderRadius: "50%",
          }}
        />

        <Typography component="h1" variant="h5">
          Acessar perfil
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
      >
        <Typography component="h1" variant="h5">
          Adiciona usuario
        </Typography>

        <IconButton edge="end" aria-label="add" onClick={handleAddUser}>
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
