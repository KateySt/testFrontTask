"use client";

import React from "react";
import CityCard from "@/components/card/CityCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addCity } from "@/store/city/citySlice";
import { Button, HStack, Input, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchSchema, SearchValues } from "@/validations";
import { useForm } from "react-hook-form";

const Lists = () => {
  const { cities } = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SearchValues>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = (values: SearchValues) => {
    dispatch(addCity(values.search.trim()));
    reset();
  };

  return (
    <Stack gap="2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack gap="2" mb="2">
          <Input
            placeholder="Enter city"
            type="search"
            {...register("search")}
          />
          <Button type="submit">Add</Button>
        </HStack>

        {errors.search && <Text color="red">{errors.search.message}</Text>}
      </form>

      <Stack gap="4" direction="row" wrap="wrap" justifyContent="center">
        {cities.length > 0 ? (
          cities.map((city) => <CityCard key={city} city={city} />)
        ) : (
          <Text>No cities added</Text>
        )}
      </Stack>
    </Stack>
  );
};

export default Lists;
