"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";

import ChemEdit from "@/app/Home/AddInfo/Comp/EditDeleteUpdate/EditComp/ChemEdit";
export default function ListOfChem() {
  const { allChem } = useGlobalContext();

  const user = allChem?.chemData;

  if (!user || user.length === 0) {
    return <div>No data available.</div>;
  }

  const columnsToShow = [
    "Area",
    "DLNo",
    "GSTNo",
    "address",
    "chemCode",
    "contactPer",
    "chemName",

    "Actions",
  ];

  return (
    <>
      <Table aria-label="User data table">
        <TableHeader>
          {columnsToShow.map((columnKey) => (
            <TableColumn key={columnKey}>{columnKey}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {user?.map((item) => (
            <TableRow
              className="p-2 hover:bg-gray-100 cursor-pointer"
              key={item._id}
            >
              {columnsToShow.map((columnKey) => (
                <TableCell
                  className=" hove:text-black hover:font-semibold cursor-pointer"
                  key={columnKey}
                >
                  {columnKey === "Actions" ? (
                    <>
                      <div className="flex flex-row justify-center items-center gap-3">
                        <ChemEdit key={item?._id} item={item ? item : item} />
                      </div>
                    </>
                  ) : (
                    item[columnKey]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
