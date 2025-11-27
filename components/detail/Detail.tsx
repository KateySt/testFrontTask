"use client";

import React from "react";
import Table from "@/components/table/TableBase";
import { useGetCityForecastQuery } from "@/store/services/weather";
import { Image, Spinner, Stack, Text } from "@chakra-ui/react";
import ChartWithTabs from "@/components/сhartWithTabs/ChartWithTabs";

type Props = {
  city: string;
};

const Detail = ({ city }: Props) => {
  const { data, error, isLoading } = useGetCityForecastQuery(city);

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red">Error loading weather</Text>;
  if (!data) return <Text>No data</Text>;

  const rows = data.list.map((weatherItem) => [
    weatherItem.dt_txt,
    weatherItem.weather[0].main,
    weatherItem.visibility,
    weatherItem.weather[0].description,
    <Image
      key={weatherItem.weather[0].id}
      rounded="sm"
      src={`https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png`}
      alt={weatherItem.weather[0].description}
    />,
  ]);

  const tableData = {
    columns: [
      {
        key: "date",
        title: "Date time",
      },
      {
        key: "weather",
        title: "Weather",
      },
      {
        key: "visibility",
        title: "Visibility",
      },
      {
        key: "description",
        title: "Description",
      },
      {
        key: "icon",
        title: "Icon",
      },
    ],
    rows,
  };

  return (
    <Stack gap="2">
      <Stack gap="4">
        <Text textStyle="lg" fontWeight="bold">
          {city}
        </Text>
        <Text>
          Sunrise: {new Date(data.city.sunrise * 1000).toLocaleTimeString()}
        </Text>
        <Text>
          Sunset: {new Date(data.city.sunset * 1000).toLocaleTimeString()}
        </Text>
        <Text>Start date time: {data.list[0].dt_txt}</Text>
        <Text>End date time: {data.list[data.list.length - 1].dt_txt}</Text>
      </Stack>
      <ChartWithTabs data={data.list} />
      <Table data={tableData} />
    </Stack>
  );
};

export default Detail;
