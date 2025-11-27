"use client";

import { Stack, Switch } from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Stack gap="2">
      <Switch.Root checked={isDark} onCheckedChange={toggleColorMode}>
        <Switch.HiddenInput />
        <Switch.Control />
        <Switch.Label>Toggle Mode</Switch.Label>
      </Switch.Root>
      {children}
    </Stack>
  );
};

export default ThemeProvider;
