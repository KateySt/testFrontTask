import React from "react";
import Lists from "@/components/list/Lists";
import { Text } from "@chakra-ui/react";

export default function Page() {
  return (
    <>
      <Text fontSize="2xl" fontWeight="bold">
        Lists of cities
      </Text>
      <Lists />
    </>
  );
}
