"use client";
import { Button, Stack, Text } from "@chakra-ui/react";

type Props = {
  error: Error;
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  return (
    <main>
      <Stack gap="2">
        <Text textStyle="lg">Something went wrong!</Text>
        <Text fontWeight="bold">{error?.message}</Text>
        <Button onClick={() => reset()}>Try again</Button>
      </Stack>
    </main>
  );
}
