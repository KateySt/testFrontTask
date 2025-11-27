import React from "react";
import { render, screen } from "../../../utils/testUtils";
import { Router } from "@/router";
import Page from "@/app/(overview)/[slug]/page";

jest.mock("@/components/detail/Detail", () => {
  return function MockDetail({ city }: { city: string }) {
    return <div data-testid="detail-component">Detail for {city}</div>;
  };
});

describe("City Detail Page", () => {
  it("renders the Detail component with the correct city", async () => {
    const params = Promise.resolve({ slug: "kyiv" });
    render(await Page({ params }));

    const detailComponent = screen.getByTestId("detail-component");
    expect(detailComponent).toBeInTheDocument();
    expect(detailComponent).toHaveTextContent("Detail for kyiv");
  });

  it("displays a link to the home page", async () => {
    const params = Promise.resolve({ slug: "lviv" });
    render(await Page({ params }));

    const homeLink = screen.getByRole("link", { name: /redirect to home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", Router.HOME);
  });

  it("correctly handles different cities", async () => {
    const cities = ["kyiv", "lviv", "odesa", "kharkiv"];

    for (const city of cities) {
      const params = Promise.resolve({ slug: city });
      const { unmount } = render(await Page({ params }));

      const detailComponent = screen.getByTestId("detail-component");
      expect(detailComponent).toHaveTextContent(`Detail for ${city}`);

      unmount();
    }
  });

  it("passes the slug parameter as the city prop to the Detail component", async () => {
    const params = Promise.resolve({ slug: "zaporizhzhia" });
    render(await Page({ params }));

    expect(screen.getByText(/zaporizhzhia/i)).toBeInTheDocument();
  });
});
