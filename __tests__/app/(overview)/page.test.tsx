import React from "react";
import { render, screen } from "../../utils/testUtils";
import Page from "@/app/(overview)/page";

jest.mock("@/components/list/Lists", () => {
  return function MockLists() {
    return <div />;
  };
});

describe("Home Page", () => {
  it("renders the page heading", () => {
    render(<Page />);

    const heading = screen.getByText("Lists of cities");
    expect(heading).toBeInTheDocument();
  });
});
