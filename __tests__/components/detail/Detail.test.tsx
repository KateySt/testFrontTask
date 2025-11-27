import React from "react";
import { render, screen, waitFor } from "./../../utils/testUtils";
import Detail from "@/components/detail/Detail";
import * as weatherService from "@/store/services/weather";
import { mockWeatherApiResponse } from "@/__tests__/mocks";

jest.mock("@/store/services/weather");
jest.mock("react-chartjs-2", () => ({
  Line: () => <div data-testid="chart" />,
}));

describe("Detail Component", () => {
  const city = "Kyiv";

  it("shows error message when error occurs", async () => {
    (weatherService.useGetCityForecastQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: true,
    });

    render(<Detail city={city} />);

    await waitFor(() => {
      expect(screen.getByText(/error loading weather/i)).toBeInTheDocument();
    });
  });

  it("shows 'No data' when data is undefined", async () => {
    (weatherService.useGetCityForecastQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    render(<Detail city={city} />);

    await waitFor(() => {
      expect(screen.getByText(/no data/i)).toBeInTheDocument();
    });
  });

  it("renders city info, table and chart when data is available", async () => {
    (weatherService.useGetCityForecastQuery as jest.Mock).mockReturnValue({
      data: mockWeatherApiResponse,
      isLoading: false,
      error: null,
    });

    render(<Detail city={city} />);

    await waitFor(() => {
      expect(screen.getByText(city)).toBeInTheDocument();
      expect(
        screen.getByText(
          new RegExp(
            new Date(
              mockWeatherApiResponse.city.sunrise * 1000
            ).toLocaleTimeString()
          )
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          new RegExp(
            new Date(
              mockWeatherApiResponse.city.sunset * 1000
            ).toLocaleTimeString()
          )
        )
      ).toBeInTheDocument();
      expect(screen.getByText("Date time")).toBeInTheDocument();
      expect(screen.getByText("Weather")).toBeInTheDocument();
      expect(screen.getByTestId("chart")).toBeInTheDocument();
    });
  });
});
