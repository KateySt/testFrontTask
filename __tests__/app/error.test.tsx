import { fireEvent } from "@testing-library/react";
import GlobalError from "@/app/error";
import { render, screen } from "../utils/testUtils";

describe("GlobalError Component", () => {
  const mockReset = jest.fn();
  const error = new Error("Test error message");

  test("renders the main error message", () => {
    render(<GlobalError error={error} reset={mockReset} />);
    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
  });

  test("renders the specific error message", () => {
    render(<GlobalError error={error} reset={mockReset} />);
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });

  test("renders the Try again button", () => {
    render(<GlobalError error={error} reset={mockReset} />);
    expect(
      screen.getByRole("button", { name: /try again/i })
    ).toBeInTheDocument();
  });

  test("calls reset function when button is clicked", () => {
    render(<GlobalError error={error} reset={mockReset} />);
    const button = screen.getByRole("button", { name: /try again/i });
    fireEvent.click(button);
    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
