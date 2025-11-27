import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WeatherApiResponse, WeatherData } from "@/type";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (builder) => ({
    getCityWeather: builder.query<WeatherData, string>({
      query: (city) => `weather?q=${city}&units=metric&appid=${API_KEY}`,
    }),
    getCityForecast: builder.query<WeatherApiResponse, string>({
      query: (city) => `forecast?q=${city}&units=metric&appid=${API_KEY}`,
    }),
  }),
});

export const { useGetCityWeatherQuery, useGetCityForecastQuery } = weatherApi;
