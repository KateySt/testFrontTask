import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import ThemeProvider from "@/providers/ThemeProvider";

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider>
      <ThemeProvider>{children}</ThemeProvider>
      <Toaster />
    </Provider>
  );
};

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
