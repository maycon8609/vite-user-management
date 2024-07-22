import { FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { Copyright } from "../../components/Copyright";
import { useAuth } from "../../hooks/useAuth";

export const SignIn: FC = () => {
  const [error, setError] = useState<string | null>(null);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email") as string | null;
    const password = data.get("password") as string | null;

    let response;
    if (!email || !password) {
      response = "E-mail e senha obrigatórios para acessar a aplicação";
    } else {
      response = signIn(email, password);
    }

    if (response) {
      setError(response);
    } else {
      setError(null);
      navigate("/home");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Entrar
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            autoComplete="email"
            autoFocus
            fullWidth
            id="email"
            label="Endereço de e-mail"
            margin="normal"
            name="email"
            required
          />
          <TextField
            autoComplete="current-password"
            fullWidth
            id="password"
            label="Senha"
            margin="normal"
            name="password"
            required
            type="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>

          <Box display="flex" justifyContent="center">
            <Link href="/sign-up" variant="body2">
              Criar conta
            </Link>
          </Box>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};
