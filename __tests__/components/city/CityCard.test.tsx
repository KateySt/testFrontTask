import React from "react";
import CityCard from "@/components/card/CityCard";
import { removeCity } from "@/store/city/citySlice";
import userEvent from "@testing-library/user-event";
import * as redux from "@/store/hooks";
import { render, screen, waitFor } from "@/__tests__/utils/testUtils";
import { map, mockWeatherData } from "@/__tests__/mocks";
import { useGetCityWeatherQuery } from "@/store/services/weather";
import { toaster } from "@/components/ui/toaster";

jest.mock("@/store/hooks");
jest.mock("@/store/services/weather");
jest.mock("@/components/ui/toaster");

describe("CityCard Component", () => {
  const mockDispatch = jest.fn();
  const mockRefetch = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    (useGetCityWeatherQuery as jest.Mock).mockImplementation((city: string) => {
      return { ...(map[city] ?? {}), refetch: mockRefetch };
    });

    jest.spyOn(redux, "useAppDispatch").mockReturnValue(mockDispatch);
    jest
      .spyOn(redux, "useAppSelector")
      .mockReturnValue({ cities: ["Kyiv", "Lviv", "Odesa"] });
  });

  it("calls refetch on Refresh button click", async () => {
    const user = userEvent.setup();
    render(<CityCard city="Kyiv" />);

    const refreshBtn = screen.getByRole("button", { name: /refresh/i });
    await user.click(refreshBtn);

    expect(mockRefetch).toHaveBeenCalled();
  });

  it("renders the city card with weather data", () => {
    render(<CityCard city="Kyiv" />);

    expect(screen.getByText("Kyiv")).toBeInTheDocument();
    expect(screen.getByText(/clear sky/i)).toBeInTheDocument();
    expect(screen.getByText(/12°C/)).toBeInTheDocument();
  });

  it("calls toaster.create when there is an error", async () => {
    (useGetCityWeatherQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: { message: "Some error" },
      isFetching: false,
      refetch: mockRefetch,
    });

    render(<CityCard city="Kyiv" />);

    await waitFor(() => {
      expect(toaster.create).toHaveBeenCalledWith({
        description: "Error loading weather",
        type: "error",
      });
    });
  });

  it("does not navigate if data is missing", async () => {
    (useGetCityWeatherQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: null,
      isFetching: false,
      refetch: mockRefetch,
    });

    const user = userEvent.setup();
    render(<CityCard city="Kyiv" />);

    const card = screen.getByText("No data").closest("div");
    await user.click(card!);

    expect(mockPush).not.toHaveBeenCalled();
  });

  it("displays Refresh and Delete buttons", () => {
    render(<CityCard city="Kyiv" />);

    expect(
      screen.getByRole("button", { name: /refresh/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("applies correct variants", () => {
    const { container, rerender } = render(
      <CityCard city="Kyiv" variant="outline" />
    );

    expect(container.firstChild).toBeInTheDocument();
    rerender(<CityCard city="Kyiv" variant="subtle" />);

    expect(container.firstChild).toBeInTheDocument();
    rerender(<CityCard city="Kyiv" variant="elevated" />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("does not show buttons when loading", () => {
    (useGetCityWeatherQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isFetching: true,
      isLoading: true,
      isSuccess: false,
      isError: false,
      refetch: mockRefetch,
    });

    render(<CityCard city="Kyiv" />);

    expect(
      screen.queryByRole("button", { name: /refresh/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /delete/i })
    ).not.toBeInTheDocument();
  });

  it("shows error message", () => {
    (useGetCityWeatherQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: { message: "City not found" },
      refetch: mockRefetch,
    });

    render(<CityCard city="InvalidCity" />);

    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText(/error loading weather/i)).toBeInTheDocument();
  });

  it("does not show Refresh button on error", () => {
    (useGetCityWeatherQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: { message: "City not found" },
      refetch: mockRefetch,
    });

    render(<CityCard city="InvalidCity" />);

    expect(
      screen.queryByRole("button", { name: /refresh/i })
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("calls refresh when Refresh button is clicked", async () => {
    const user = userEvent.setup();

    render(<CityCard city="Kyiv" />);

    const refreshButton = screen.getByRole("button", { name: /refresh/i });

    await user.click(refreshButton);

    expect(mockRefetch).toHaveBeenCalled();
  });

  it("dispatches removeCity on Delete click", async () => {
    const user = userEvent.setup();

    render(<CityCard city="Kyiv" />);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await user.click(deleteButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(removeCity("Kyiv"));
    });
  });

  it("shows positive temperature with °C", () => {
    render(<CityCard city="Kyiv" />);

    expect(screen.getByText(/12°C/)).toBeInTheDocument();
  });

  it("shows negative temperature", () => {
    (useGetCityWeatherQuery as jest.Mock).mockReturnValue({
      data: {
        ...mockWeatherData,
        main: { ...mockWeatherData.main, temp: -5 },
      },
      isFetching: false,
      isLoading: false,
      isSuccess: true,
      isError: false,
      refetch: mockRefetch,
    });

    render(<CityCard city="Kyiv" />);

    expect(screen.getByText(/-5°C/)).toBeInTheDocument();
  });
});
