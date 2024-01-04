import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import SignInButton from "../components/SignInButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

export default function SignInPage(): React.ReactElement {
  return (
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
            <img src="../../public/logo-burch-small.png" width={300} alt="" />
          </Box>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="div" sx={{ mt: 1 }}>
            <SignInButton />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
