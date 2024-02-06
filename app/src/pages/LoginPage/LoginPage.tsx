import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { SignInButton, Background } from "./components";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

export default function LoginPage(): React.ReactElement {
  return (
    <Background>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box>
              <img src="/logo-burch-small.png" width={300} alt="" />
            </Box>
            <Typography
              component="h1"
              variant="h5"
              sx={{ color: "white", margin: "20px" }}
            >
              Internship Management System
            </Typography>
            <Box component="div" sx={{ mt: 1 }}>
              <SignInButton />
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Background>
  );
}
