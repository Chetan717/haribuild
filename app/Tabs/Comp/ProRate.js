"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Button,
  Spinner,
} from "@nextui-org/react";
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";
import EditProdRate from "@/app/Home/AddInfo/Comp/EditDeleteUpdate/EditComp/EditProdAndRate";
import { useQuery, gql } from "@apollo/client";
import AddProduct from "@/app/Home/AddInfo/Comp/AddProduct";
export default function ListOfProdRate() {
  const { allProdRate } = useGlobalContext();

  const [page, setPage] = React.useState(1);
  const [last, setLast] = React.useState(20);
  const [first, setFirst] = React.useState(0);

  const DataPerPage = 10;

  const LastIndex = DataPerPage * page;
  const FirstIndex = LastIndex - DataPerPage;

  const GET_PRODUCT_DATA = gql`
 
  query Query {
    Product(first : ${first || 0},last:${last || 20}) {
      lengthData
   Product {
    _id
    ProductName
    MRP
    Packing
    PTS
    PTR
  scheme {
    id
    MainPro
    FreeProduct
  }
}
    }
  }
`;

  const { loading, error, data, refetch } = useQuery(GET_PRODUCT_DATA);

  const PAginatedData = data?.Product?.Product;
  const SlicedData = PAginatedData?.slice(FirstIndex, LastIndex);

  const TotalData = data?.Product?.lengthData;
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

  const columnsToShow = [
    "ProductName",
    "Packing",
    "MRP",
    "PTS",
    "PTR",
    "Actions",
  ];

  return (
    <>
      <AddProduct RefetchData={refetch} DataFetch={GET_PRODUCT_DATA} />
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
                      <EditProdRate
                        key={item?._id}
                        item={item ? item : item}
                        RefetchData={refetch}
                        DataFetch={GET_PRODUCT_DATA}
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
