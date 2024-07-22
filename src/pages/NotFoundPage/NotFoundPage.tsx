import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  return (
    <Container component="main">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <ErrorOutlineIcon color="error" sx={{ fontSize: 80 }} />
        <Typography component="h1" variant="h4" gutterBottom>
          404 - Página não encontrada
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          paragraph
        >
          Desculpe, a página que você está procurando não existe.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Ir para a página inicial
        </Button>
      </Box>
    </Container>
  );
};
