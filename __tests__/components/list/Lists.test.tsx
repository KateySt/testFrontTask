import React from "react";
import { render, screen, waitFor } from "../../utils/testUtils";
import Lists from "@/components/list/Lists";
import { addCity } from "@/store/city/citySlice";
import userEvent from "@testing-library/user-event";

import * as redux from "@/store/hooks";
import { useGetCityWeatherQuery } from "@/store/services/weather";
import { map } from "@/__tests__/mocks";
import { mockDispatch } from "@/jest.setup";

jest.mock("@/store/hooks");
jest.mock("@/store/services/weather");

describe("Lists Component", () => {
  beforeEach(() => {
    (useGetCityWeatherQuery as jest.Mock).mockImplementation((city: string) => {
      return (
        map[city] ?? { data: { name: city }, isLoading: false, error: null }
      );
    });

    jest.spyOn(redux, "useAppDispatch").mockReturnValue(mockDispatch);
    jest
      .spyOn(redux, "useAppSelector")
      .mockReturnValue({ cities: ["Kyiv", "Lviv", "Odesa"] });
  });

  it("renders input and button", () => {
    render(<Lists />);
    expect(screen.getByPlaceholderText("Enter city")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("renders list of cities", () => {
    render(<Lists />);

    expect(screen.getByText("Kyiv")).toBeInTheDocument();
    expect(screen.getByText("Lviv")).toBeInTheDocument();
    expect(screen.getByText("Odesa")).toBeInTheDocument();
  });

  it("adds city on submit", async () => {
    const user = userEvent.setup();
    render(<Lists />);

    const input = screen.getByPlaceholderText("Enter city");
    const button = screen.getByRole("button", { name: /add/i });

    await user.type(input, "Kharkiv");
    await user.click(button);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(addCity("Kharkiv"));
    });
  });

  it("clears input after add", async () => {
    const user = userEvent.setup();
    render(<Lists />);

    const input = screen.getByPlaceholderText("Enter city") as HTMLInputElement;
    const button = screen.getByRole("button", { name: /add/i });

    await user.type(input, "Dnipro");
    await user.click(button);

    await waitFor(() => {
      expect(input.value).toBe("");
    });
  });

  it("trims city name", async () => {
    const user = userEvent.setup();
    render(<Lists />);

    const input = screen.getByPlaceholderText("Enter city");
    const button = screen.getByRole("button", { name: /add/i });

    await user.type(input, "  Zaporizhzhia  ");
    await user.click(button);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(addCity("Zaporizhzhia"));
    });
  });

  it("shows validation error when empty", async () => {
    const user = userEvent.setup();
    render(<Lists />);

    const button = screen.getByRole("button", { name: /add/i });
    await user.click(button);

    expect(screen.getByText(/enter more than 1 symbol/i)).toBeInTheDocument();
  });

  it("renders empty list when no cities", () => {
    jest.spyOn(redux, "useAppSelector").mockReturnValue({ cities: [] });

    render(<Lists />);

    expect(screen.getByText(/No cities added/i)).toBeInTheDocument();
  });
});
