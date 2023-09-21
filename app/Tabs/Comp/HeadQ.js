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
  Button,
  Pagination,
} from "@nextui-org/react";
import { useQuery, gql } from "@apollo/client";
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";

import EditHeadQ from "@/app/Home/AddInfo/Comp/EditDeleteUpdate/EditComp/HeadEdit";
import AddHeadQ from "@/app/Home/AddInfo/Comp/AddHeadQ";
export default function ListOfHeadQ() {
  const { allHeadQ } = useGlobalContext();

  const [page, setPage] = React.useState(1);
  const [last, setLast] = React.useState(20);
  const [first, setFirst] = React.useState(0);

  const DataPerPage = 10;

  const LastIndex = DataPerPage * page;
  const FirstIndex = LastIndex - DataPerPage;

  const GET_HEADQ_DATA = gql`
  query Query {
  
    HeadQ(first : ${first || 0},last:${last || 20}) {
      lengthData
      HeadQ {
        _id
    HeadQuaterName
    Active
      }
    }
  }


`;

  const { loading, error, data, refetch } = useQuery(GET_HEADQ_DATA);

  const PAginatedData = data?.HeadQ?.HeadQ;
  const SlicedData = PAginatedData?.slice(FirstIndex, LastIndex);

  const TotalData = data?.HeadQ?.lengthData;
  const TotalPage = Math.ceil(PAginatedData?.length / DataPerPage);

  const GetAllData = (TotalData) => {
    setFirst(0);
    setLast(TotalData);
  };

  const setLastData = (last) => {
    setFirst(0);
    setLast(last);
  };

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const columnsToShow = ["HeadQuaterName", "Actions"];
  return (
    <>
      <AddHeadQ RefetchData={refetch} DataFetch={GET_HEADQ_DATA} />
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
              onClick={() => setLastData(last + 10)}
              size="sm"
              className="bg-black text-white"
            >
              Load More
            </Button>
            {TotalData === SlicedData?.length ? null : (
              <Button
                onClick={() => GetAllData(TotalData)}
                size="sm"
                className="bg-black text-white"
              >
                {`Get All -${TotalData}`}
              </Button>
            )}
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
          {SlicedData?.map((item) => (
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
                      <EditHeadQ
                        key={item?._id}
                        item={item ? item : item}
                        RefetchData={refetch}
                        DataFetch={GET_HEADQ_DATA}
                      />
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
