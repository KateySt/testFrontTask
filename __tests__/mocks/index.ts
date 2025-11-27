import { Props } from "@/components/table/TableBase";
import { WeatherApiResponse } from "@/type";

export const map: Record<string, unknown> = {
  Kyiv: {
    data: {
      name: "Kyiv",
      main: { temp: 12 },
      weather: [{ description: "Clear sky" }],
    },
    isLoading: false,
    error: null,
  },
  Lviv: {
    data: {
      name: "Lviv",
      main: { temp: 8 },
      weather: [{ description: "Cloudy" }],
    },
    isLoading: false,
    error: null,
  },
  Odesa: {
    data: {
      name: "Odesa",
      main: { temp: 15 },
      weather: [{ description: "Sunny" }],
    },
    isLoading: false,
    error: null,
  },
};

export const mockWeatherData = {
  name: "Kyiv",
  main: {
    temp: 20,
    humidity: 65,
    pressure: 1013,
    feels_like: 18,
    temp_min: 15,
    temp_max: 25,
  },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    },
  ],
  wind: {
    speed: 5,
    deg: 180,
  },
  sys: {
    country: "UA",
  },
};

export const mockWeatherApiResponse: WeatherApiResponse = {
  cod: "200",
  message: 0,
  cnt: 2,
  list: [
    {
      dt: 1701081600,
      main: {
        temp: 20,
        feels_like: 19,
        temp_min: 18,
        temp_max: 21,
        pressure: 1012,
        sea_level: 1012,
        grnd_level: 1008,
        humidity: 60,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01d",
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 3.5,
        deg: 180,
        gust: 5,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "d",
      },
      dt_txt: "2025-11-27 12:00:00",
    },
    {
      dt: 1701092400,
      main: {
        temp: 22,
        feels_like: 21,
        temp_min: 21,
        temp_max: 23,
        pressure: 1010,
        sea_level: 1010,
        grnd_level: 1006,
        humidity: 55,
        temp_kf: 0,
      },
      weather: [
        {
          id: 801,
          main: "Clouds",
          description: "few clouds",
          icon: "02d",
        },
      ],
      clouds: {
        all: 20,
      },
      wind: {
        speed: 4,
        deg: 200,
        gust: 6,
      },
      visibility: 9000,
      pop: 0.1,
      sys: {
        pod: "d",
      },
      dt_txt: "2025-11-27 15:00:00",
    },
  ],
  city: {
    coord: {
      lon: 30.5234,
      lat: 50.4501,
    },
    country: "UA",
    id: 703448,
    name: "Kyiv",
    population: 2884000,
    sunrise: 1701048000,
    sunset: 1701084000,
    timezone: 7200,
  },
};

export const data: Props["data"] = {
  columns: [
    { title: "Name", key: "name" },
    { title: "Age", key: "age" },
    { title: "City", key: "city" },
  ],
  rows: [
    ["Alice", "25", "Kyiv"],
    ["Bob", "30", "Lviv"],
  ],
};
