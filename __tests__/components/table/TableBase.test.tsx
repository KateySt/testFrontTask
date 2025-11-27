import React, { ReactNode } from "react";
import { fireEvent, render, screen } from "../../utils/testUtils";
import TableBase from "@/components/table/TableBase";
import { data } from "@/__tests__/mocks";

describe("TableBase component", () => {
  it("renders without crashing", () => {
    render(<TableBase data={data} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("City")).toBeInTheDocument();
  });

  it("renders all rows and cells", () => {
    render(<TableBase data={data} />);
    data.rows.forEach((row: ReactNode[]) => {
      row.forEach((cell) => {
        expect(screen.getByText(cell as string)).toBeInTheDocument();
      });
    });
  });

  it("calls onSelectRow when a row is clicked", () => {
    const onSelectRow = jest.fn();
    render(<TableBase data={data} onSelectRow={onSelectRow} />);

    const firstRow = screen.getByText("Alice").closest("tr");
    const secondRow = screen.getByText("Bob").closest("tr");

    expect(firstRow).toBeInTheDocument();
    expect(secondRow).toBeInTheDocument();

    if (firstRow) fireEvent.click(firstRow);
    expect(onSelectRow).toHaveBeenCalledWith(0);

    if (secondRow) fireEvent.click(secondRow);
    expect(onSelectRow).toHaveBeenCalledWith(1);
  });
});
