"use client";

import { HStack, Stack, Switch, Heading } from "@chakra-ui/react";
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
      <HStack justifyContent="space-between">
        <Heading as="h1">Web-app</Heading>
        <Switch.Root checked={isDark} onCheckedChange={toggleColorMode}>
          <Switch.HiddenInput />
          <Switch.Control />
          <Switch.Label>Toggle Mode</Switch.Label>
        </Switch.Root>
      </HStack>
      {children}
    </Stack>
  );
};

export default ThemeProvider;
