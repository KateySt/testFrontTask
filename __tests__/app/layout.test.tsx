import { render, screen } from "@testing-library/react";
import React from "react";
import RootLayout from "@/app/layout";

describe("RootLayout", () => {
  test("renders children inside providers", () => {
    render(
      <RootLayout>
        <div data-testid="child">Hello World</div>
      </RootLayout>
    );

    expect(screen.getByTestId("child")).toHaveTextContent("Hello World");
  });
});
