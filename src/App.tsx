import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { LanguageProvider } from "./components/contexts/LanguageProvider";
import { ModalProvider } from "./components/contexts/ModalProvider";
import { router } from "./routes/router";
import { theme } from "./theme";

const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <ModalProvider>
            <RouterProvider router={router} />
          </ModalProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
