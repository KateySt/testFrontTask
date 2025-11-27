"use client";

import { Button, Card, SkeletonText, Stack, Text } from "@chakra-ui/react";
import { useGetCityWeatherQuery } from "@/store/services/weather";
import { useRouter } from "next/navigation";
import { removeCity } from "@/store/city/citySlice";
import { useAppDispatch } from "@/store/hooks";
import { Ban, SearchX } from "lucide-react";
import React, { useEffect } from "react";
import { toaster } from "@/components/ui/toaster";

type Props = {
  city: string;
  variant?: "subtle" | "outline" | "elevated";
};

export default function CityCard({ city, variant = "elevated" }: Props) {
  const { data, error, isFetching, refetch } = useGetCityWeatherQuery(city);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleRefresh = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    refetch();
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(removeCity(city));
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        toaster.create({
          description: "Error loading weather",
          type: "error",
        });
      }, 0);
    }
  }, [error]);

  return (
    <Card.Root
      width="360px"
      height="210px"
      variant={variant}
      cursor={data ? "pointer" : "default"}
      onClick={() => data && router.push(`/${data.name}`)}
    >
      <Card.Body>
        {isFetching && !error && !data && (
          <SkeletonText noOfLines={5} gap="4" />
        )}

        {error && !isFetching && !data && (
          <Stack gap="2" direction="column" alignItems="center">
            <Ban size="32" />
            <Card.Title>Error</Card.Title>
            <Card.Description>Error loading weather</Card.Description>
          </Stack>
        )}

        {!isFetching && !error && !data && (
          <Stack gap="2" direction="column" alignItems="center">
            <SearchX size="32" />
            <Card.Title>No data</Card.Title>
            <Card.Description>No weather data found</Card.Description>
          </Stack>
        )}

        {!isFetching && !error && data && (
          <>
            <Card.Title mb="2">{data.name}</Card.Title>
            <Card.Description>{data.weather[0].description}</Card.Description>
            <Text
              textStyle="2xl"
              fontWeight="medium"
              letterSpacing="tight"
              mt="2"
            >
              {data.main?.temp}°C
            </Text>
          </>
        )}
      </Card.Body>

      {!isFetching && (
        <Card.Footer justifyContent="flex-end">
          {!error && data && (
            <Button variant="outline" onClick={handleRefresh}>
              Refresh
            </Button>
          )}
          <Button onClick={handleDelete}>Delete</Button>
        </Card.Footer>
      )}
    </Card.Root>
  );
}
