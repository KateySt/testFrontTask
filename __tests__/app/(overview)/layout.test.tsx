import { render, screen } from "@testing-library/react";
import React from "react";
import Layout from "@/app/(overview)/layout";

describe("RootLayout", () => {
  test("renders children inside providers", () => {
    render(
      <Layout>
        <div data-testid="child">Hello World</div>
      </Layout>
    );

    expect(screen.getByTestId("child")).toHaveTextContent("Hello World");
  });
});
