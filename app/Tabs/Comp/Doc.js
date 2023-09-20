"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  Button,
  Pagination,
  TableCell,
} from "@nextui-org/react";
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";
import { Spinner } from "@nextui-org/react";
import DocEdit from "@/app/Home/AddInfo/Comp/EditDeleteUpdate/EditComp/DocEdit";
import { useQuery, gql } from "@apollo/client";
export default function ListOfDoc({
  limitData,
  setLimitData,
  AreaValue,
  search,
  Active,
  valueAp,
}) {
  const [page, setPage] = React.useState(1);
  const [last, setLast] = React.useState(20);
  const [first, setFirst] = React.useState(0);

  const DataPerPage = 10;

  const LastIndex = DataPerPage * page;
  const FirstIndex = LastIndex - DataPerPage;

  const GET_DOCTOR_DATA = gql`
    query DoctorData {
      Doctor(first:${
        limitData.first && Active === "Doctor" ? limitData.first : first
      }, last:${
    limitData.last && Active === "Doctor" ? limitData.last : last
  }) {
        lengthData
        Doctor {
          _id
          DoctorCode
          DoctorName
          HosName
          mobile
          address
          Area
          Degree
          Speciality
          Dob
          Doa
          P1
          P2
          approved
          createdBy
          createdAt
        } 
      }
    }`;

  const { loading, error, data,refetch } = useQuery(GET_DOCTOR_DATA);
  const PaginatedData = data?.Doctor?.Doctor;

  const getFiteredData = (search, AreaValue, PaginatedData) => {
    if (search && Active === "Doctor") {
      return PaginatedData?.filter((i) =>
        i?.DoctorName?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (AreaValue && Active === "Doctor") {
      const AreaWiseData = PaginatedData?.filter(
        (i) => i.Area === `${AreaValue}`
      );
      return AreaWiseData;
    }

    // if (valueAp === false && Active === "Doctor") {
    //   const ApvData = PaginatedData?.filter((i) => i.approved === false);
    //   return ApvData;
    // }

    return PaginatedData;
  };

 

  const DataFiltered = getFiteredData(search, AreaValue, PaginatedData)?.slice(
    FirstIndex,
    LastIndex
  );

  const TotalData = data?.Doctor?.lengthData;
  const TotalPage =
    search || AreaValue
      ? Math.ceil(DataFiltered?.length / DataPerPage)
      : Math.ceil(PaginatedData?.length / DataPerPage);

  const setLastData = (last) => {
    setLast(last);
    setFirst(0);
  };

  const GetAllData = (last) => {
    setLimitData({
      first: 0,
      last: last,
    });
  };

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const columnsToShow = [
    "DoctorName",
    "DoctorCode",
    "HosName",
    "Speciality",
    "Degree",
    "mobile",
    "Area",
    "Actions",
  ];

  return (
    <>
      <Table
        bottomContent={
          <div className="flex flex-row gap-4">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={TotalPage}
              onChange={(page) => setPage(page)}
            />
            <Button
              onClick={() => setLastData(Number(last + 10))}
              size="sm"
              className="bg-black text-white"
            >
              Load More
            </Button>

            <Button
              onClick={() => GetAllData(TotalData)}
              size="sm"
              className="bg-black text-white"
            >
              {`Get All -${TotalData}`}
            </Button>
          </div>
        }
        aria-label="User data table"
      >
        <TableHeader>
          {columnsToShow.map((columnKey) => (
            <TableColumn key={columnKey}>{columnKey}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {DataFiltered?.map((item) => (
            <TableRow
              className="p-2 hover:bg-gray-100 cursor-pointer"
              key={item?._id}
            >
              {columnsToShow.map((columnKey) => (
                <TableCell
                  className=" hove:text-black hover:font-semibold cursor-pointer"
                  key={columnKey}
                >
                  {columnKey === "Actions" ? (
                    <div className="flex flex-row justify-center items-center gap-3">
                      <DocEdit key={item?._id} item={item ? item : item} RefetchData={refetch}
                        DataFetch={GET_DOCTOR_DATA} />
                    </div>
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
