"use client";
import BootomDtails from "./Comp/BootomDtails";
import ExecutiveInfo from "./Comp/ExecutiveInfo";
import DoctorDetails from "./Comp/DoctorDetails";
import ChemStockDetails from "./Comp/ChemStockDetails";
import StockiestDetails from "./Comp/StockiestDetails";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
moment().format();
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function ReportTemp({
  AllDocByDate,
  AllChemByDate,
  AllStockByDate,
  dcrID,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [size, setSize] = React.useState("full");

  const sizes = ["full"];

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  const [seldate, setSeldate] = useState("");

  // const [allDoc, setAllDoc] = useState([]);
  // const [allChem, setAllChem] = useState([]);

  // const [allStockiest, setAllStockiest] = useState([]);
  // const [flag, setFlag] = useState(false);
  // // const tpAct = SetActiveProgram[0] || {};
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const Server = process.env.NEXT_PUBLIC_SERVER_NAME;
  //     try {
  //       const [docResponse, chemResponse, stockResponse] = await axios.all([
  //         axios.get(`${Server}/add/docTourId/${i.DcrId}`),
  //         axios.get(`${Server}/add/chemTourId/${i.DcrId}`),
  //         axios.get(`${Server}/add/stockTourId/${i.DcrId}`),
  //       ]);

  //       setAllDoc({
  //         docData: docResponse.data,
  //       });
  //       setAllChem({
  //         chemData: chemResponse.data,
  //       });

  //       setAllStockiest({
  //         stockData: stockResponse.data,
  //       });

  //       setFlag(true);
  //     } catch (error) {}
  //   };

  //   fetchData();
  // }, [seldate]);

  // console.log(allChem, "all doc");
  // //  fijnf dthe dates
  const start_date = new Date(dcrID?.startDate);
  const end_date = new Date(dcrID?.lastDate);

  const dates = [];

  while (start_date <= end_date) {
    dates.push(moment(start_date).format("DD/MM/YYYY"));
    start_date.setDate(start_date.getDate() + 1);
  }
  // end the function

  // console.log(seldate, "date");
  // const AllDocByDate = allDoc?.docData?.filter(
  //   (i) => moment(i.createdAt).format("DD/MM/YYYY") === `${seldate}`
  // );
  // const AllChemByDate = allChem?.chemData?.filter(
  //   (i) => moment(i.createdAt).format("DD/MM/YYYY") === `${seldate}`
  // );
  // const AllStockByDate = allStockiest?.stockData?.filter(
  //   (i) => moment(i.createdAt).format("DD/MM/YYYY") === `${seldate}`
  // );

  const genratePdf = () => {
    const doc = new jsPDF("l", "pt", "a4");

    doc.html(document.querySelector("#report"), {
      callback: function (pdf) {
        // Atomaticaly saved By Resume User
        pdf.save("DCR-Report");
        // notification When Fun Call or Download Pdf
        toast.success("🦄 Pdf Downloaded!");
      },
    });
  };

  return (
    <>
      {/* <div className="flex flex-row gap-5">
        {sizes.map((size) => (
          <>
            <div className="flex flex-row  gap-5" key={size}>
              <Button color="default" onPress={() => handleOpen(size)}>
                View
              </Button>
              <Button
                // onClick={genratePdf}
                color="primary"
                onPress={() => handleOpen(size)}
              >
                Download
              </Button>
            </div>
          </>
        ))}
      </div> */}

      <div className="flex flex-col gap-5 justify-center items-center">
        {/* <div className="flex flex-col justify-center ">
          <select
            className="outline-none font-semibold text-gray-600 border-1 bg-transparent text-small w-[300px] h-[50px] rounded-lg bg-gray-200 p-2"
            id="Area"
            name="seldate"
            value={seldate}
            onChange={(e) => setSeldate(e.target.value)}
            required
          >
            <option value="">Select Date</option>
            {dates?.map((i) => {
              return (
                <>
                  <option key={i} value={i}>
                    {i}
                  </option>
                </>
              );
            })}
          </select>
        </div> */}

        <div className=" flex flex-col justify-center   max-w-[800px]    h-full">
          <ExecutiveInfo AllDocByDate={AllDocByDate} />
          <div className="bg-black text-xs text-white w-full  font-semibold  ">
            Doctor Details
          </div>
          <DoctorDetails AllDocByDate={AllDocByDate} />
          <div className="bg-black text-xs text-white w-full font-semibold  ">
            Chemist Details
          </div>
          <ChemStockDetails AllChemByDate={AllChemByDate} />
          <div className="bg-black text-xs text-white w-full  font-semibold  ">
            Stockiest Details
          </div>
          <StockiestDetails AllStockByDate={AllStockByDate} />
          <BootomDtails />
        </div>
      </div>
    </>
  );
}
