import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { QueryClient } from "@tanstack/react-query";

const themeConfig = defineConfig({
  globalCss: {
    html: {
      fontFamily: "Onest, sans-serif",
    },
    "input[type=number]::-webkit-outer-spin-button, input[type=number]::-webkit-inner-spin-button":
      {
        WebkitAppearance: "none",
        margin: 0,
      },
  },
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

export const system = createSystem(defaultConfig, themeConfig);
