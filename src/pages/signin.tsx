import {
  Alert,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Link as MuiLink,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Logo from "../components/Logo";

export default function SignIn() {
  const router = useRouter();
  const { error } = router.query;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const credentials = {
      email: data.get("email"),
      password: data.get("password"),
    };

    signIn("credentials", {
      callbackUrl: "/",
      email: credentials.email,
      password: credentials.password,
    });
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Logo />
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        <Container maxWidth="xs">
          <Box component="form" onSubmit={handleSubmit} noValidate mt={1}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {error && (
              <Alert severity="error" sx={{ width: "100%" }}>
                Las credenciales ingresadas no son válidas.
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar sesión
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href={"/signup"}>
                  <MuiLink variant="body2" sx={{ cursor: "pointer" }}>
                    ¿Aún no tienes una cuenta? Regístrate
                  </MuiLink>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Container>
  );
}
