"use client";

import { SimpleGrid, Tabs } from "@chakra-ui/react";
import Chart from "@/components/chart/Chart";
import { WeatherItem } from "@/type";
import { useMemo } from "react";

const PAGE_SIZE = 10;

type Props = {
  data: WeatherItem[];
};

const ChartWithTabs = ({ data }: Props) => {
  const pages = useMemo(() => {
    const result: WeatherItem[][] = [];
    for (let i = 0; i < data.length; i += PAGE_SIZE) {
      result.push(data.slice(i, i + PAGE_SIZE));
    }
    return result;
  }, [data]);

  return (
    <SimpleGrid columns={1} gap="4" width="full">
      <Tabs.Root defaultValue="0" variant="enclosed">
        <Tabs.List>
          {pages.map((_, index) => (
            <Tabs.Trigger key={index} value={index.toString()}>
              {new Date(pages[index][0].dt_txt).getDate()}-
              {new Date(pages[index][pages[index].length - 1].dt_txt).getDate()}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {pages.map((page, index) => (
          <Tabs.Content key={index} value={index.toString()}>
            <Chart
              labels={page.map((item) => item.dt_txt.split(" ")[1].slice(0, 5))}
              data={page.map((item) => item.main.temp)}
              dataSpeed={page.map((item) => item.wind.speed)}
            />
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </SimpleGrid>
  );
};

export default ChartWithTabs;
