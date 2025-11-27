"use client";

import { HStack, Stack, Text, Switch } from "@chakra-ui/react";
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
        <Text fontSize="2xl" fontWeight="bold">
          Web-app
        </Text>
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
