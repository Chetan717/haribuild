"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Pagination,
} from "@nextui-org/react";
import { useQuery, gql } from "@apollo/client";
import EmpEdit from "./AddInfo/Comp/EditDeleteUpdate/EditComp/EmpEdit";

export default function ListOfEmp() {
  const GET_EMP_DATA = gql`
    query userData {
      user {
        _id
        Code
        pass
        empName
        userId
        mobile1
        Secmob
        address
        email
        post
        headquarters
        panNo
        adharNo
        bankAccountNo
        ifscCode
        dob
        joiningDate
        anniversaryDate
        resignationDate
        selectedAreas
        pvrRemark
        online
        Active
        Banned
        otp
        lat
        log
      }
    }
  `;
  const [page, setPage] = React.useState(1);
  const { loading, error, data, refetch } = useQuery(GET_EMP_DATA);

  const DataPerPage = 7;

  const LastIndex = DataPerPage * page;
  const FirstIndex = LastIndex - DataPerPage;

  const TotalPage = Math.ceil(data?.user?.length / DataPerPage);
  const SlicedData = data?.user?.slice(FirstIndex, LastIndex);

  const columnsToShow = [
    "Code",
    "empName",
    "post",
    "mobile1",
    "email",
    "Actions",
  ];

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <Table
        bottomContent={
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={TotalPage}
            onChange={(page) => setPage(page)}
          />
        }
        aria-label="User data table"
      >
        <TableHeader>
          {columnsToShow.map((columnKey) => (
            <TableColumn key={columnKey}>{columnKey}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {SlicedData?.map((item) => (
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
                    <EmpEdit
                      key={item._id}
                      item={item ? item : item}
                      RefetchData={refetch}
                      DataFetch={GET_EMP_DATA}
                    />
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
