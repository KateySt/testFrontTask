import React from "react";
import { Table } from "@chakra-ui/react";

export interface Props {
  data: {
    columns: {
      title: string;
      key: string;
    }[];
    rows: React.ReactNode[][];
  };
  onSelectRow?: (rowIndex: number) => void;
}

const TableBase = ({ data, onSelectRow }: Props) => {
  return (
    <Table.Root size="sm">
      <Table.Header>
        <Table.Row>
          {data.columns.map((column) => (
            <Table.ColumnHeader key={column.key}>
              {column.title}
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.rows.map((row, index) => (
          <Table.Row
            onClick={() => onSelectRow && onSelectRow(index)}
            key={row.join("") + index}
          >
            {row.map((cell, cellIndex) => (
              <Table.Cell key={row.join("") + index + cell + cellIndex}>
                {cell}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default TableBase;
