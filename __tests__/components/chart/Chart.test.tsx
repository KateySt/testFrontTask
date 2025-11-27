import React from "react";
import { render, screen } from "../../utils/testUtils";
import Chart from "@/components/chart/Chart";

jest.mock("react-chartjs-2", () => ({
  Line: (props: unknown) => {
    return <div data-testid="line-chart">{JSON.stringify(props)}</div>;
  },
}));

describe("Chart component", () => {
  const labels = ["Mon", "Tue", "Wed"];
  const data = [20, 22, 18];
  const dataSpeed = [5, 6, 4];

  it("renders without crashing", () => {
    render(<Chart labels={labels} data={data} dataSpeed={dataSpeed} />);

    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
  });

  it("renders correct number of labels", () => {
    render(<Chart labels={labels} data={data} dataSpeed={dataSpeed} />);

    const chartDiv = screen.getByTestId("line-chart");
    const props = JSON.parse(chartDiv.textContent || "{}");

    expect(props.data.labels).toHaveLength(labels.length);
  });

  it("renders temperature and wind speed datasets", () => {
    render(<Chart labels={labels} data={data} dataSpeed={dataSpeed} />);

    const chartDiv = screen.getByTestId("line-chart");
    const props = JSON.parse(chartDiv.textContent || "{}");
    const datasetLabels = props.data.datasets.map(
      (d: { label: string }) => d.label
    );

    expect(datasetLabels).toContain("Temperature (°C)");
    expect(datasetLabels).toContain("Wind speed");
  });
});
