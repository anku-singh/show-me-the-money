import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchData } from "../store/dataReducer";
import DataTable from "react-data-table-component";
import { useAppDispatch } from "../hooks/useAppDispatch";

const BalanceSheet: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, data } = useSelector((state: any) => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  const balancedata = data.flatMap((row: any) => {
    if (row.RowType === "Header") {
      return [];
    }
    if (row.RowType === "Section") {
      const assetName = row?.Rows?.[0]?.Cells?.[0]?.Value || "";
      const assetAmount = row.Rows?.[0]?.Cells?.[1]?.Value || "";
      return {
        RowType: row.RowType,
        Title: row.Title,
        Name: assetName,
        Amount: assetAmount,
      };
    }
    if (row.RowType === "Row") {
      const assetName = row.Cells?.[0]?.Value || "";
      const assetAmount = row.Cells?.[1]?.Value || "";
      return { RowType: row.RowType, Name: assetName, Amount: assetAmount };
    }
    return [];
  });

  const columns = [
    {
      name: "Row Type",
      selector: (row: any) => row.RowType,
      sortable: true,
    },
    {
      name: "Title / Name",
      selector: (row: any) => row.Title || row.Name,
      sortable: true,
    },
    {
      name: "Value",
      selector: (row: any) => row.Amount || "",
      sortable: true,
    },
  ];

  return (
    <div>
      <h2>Balance Sheet</h2>
      <DataTable
        columns={columns}
        data={balancedata}
        pagination
        striped
        responsive
        highlightOnHover
      />
    </div>
  );
};

export default BalanceSheet;
