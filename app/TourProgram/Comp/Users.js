"use client";
// import { Button } from "@nextui-org/react";
// import React from "react";
// import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";
// import { Input, InputGroup } from "rsuite";
// import SearchIcon from "@rsuite/icons/Search";
// import DCrShow from "./ShowDcr/DCrShow";
// import { Accordion, AccordionItem } from "@nextui-org/react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function Users() {
//   const { allEmpData } = useGlobalContext();
//   const router = useRouter();

//   return (
//     <>
//       <div className="flex flex-col gap-16 m-5 justify-center items-center">
//         {/* <div>
//           <InputGroup className="w-[500px] mt-10 mb-10">
//             <Input />
//             <InputGroup.Button>
//               <SearchIcon />
//             </InputGroup.Button>
//           </InputGroup>
//         </div> */}
//         <h1 className="bg-gray-100 p-3 text-black rounded-lg">All User </h1>
//         <div className="grid grid-cols-3 gap-3 ">
//           {allEmpData?.userData?.map((i) => {
//             return (
//               <>
//                 <div className="flex flex-row juatify-center gap-4 rounded-lg p-2 shadow-sm border-1 border-gray-300 items-center">
//                   <p>{`👨‍⚖️${i.empName}`}</p>
//                   <Link href={`/SigleUserTour/${i.userId}`}>
//                     <Button color="primary"> SHOW DCR</Button>
//                   </Link>
//                 </div>
//               </>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@nextui-org/react";
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";
import DCrShow from "./ShowDcr/DCrShow";
import SelectTp from "./ShowDcr/Comp/SelectTp";

// import EmpEdit from "./AddInfo/Comp/EditDeleteUpdate/EditComp/EmpEdit";
export default function ListOfEmp() {
  const { user, allEmpData, flag } = useGlobalContext();
  const userActive = allEmpData?.userData;

  if (!userActive || userActive.length === 0) {
    return (
      <div className="flex flex-col h-screen justify-center items-center gap-5">
        <Spinner />
        <p>Wait For Data ....</p>
      </div>
    );
  }

  const columnsToShow = ["Code", "empName", "post", "Actions"];
  if (!allEmpData) {
    return <Spinner />;
  } else {
    return (
      <>
        <Table aria-label="User data table">
          <TableHeader>
            {columnsToShow.map((columnKey) => (
              <TableColumn key={columnKey}>{columnKey}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {userActive?.map((item) => (
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
                        {/* <DCrShow /> */}
                        <SelectTp UserId={item.userId} />
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
}
