"use client";

import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
moment().format();
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from "@nextui-org/react";

export default function TpReport({ dcr }) {
  const [tp, setTp] = useState([]);
  const [loading, setLoading] = useState(false);
  const sizes = ["full"];

  const getTp = (dcr) => {
    const Server = process.env.NEXT_PUBLIC_SERVER_NAME;
    setLoading(true);
    console.log(dcr, "d");
    axios
      .get(`${Server}/add/tourDateUser/${dcr}`)
      .then((res) => {
        setTp(res.data);
        console.log(res.data, "data");
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
    generatePdf(dcr);
  };

  const generatePdf = () => {
    const doc = new jsPDF("p", "pt", "a4", false);

    // Add the title
    doc.setFontSize(10);
    // doc.text("", 0, 0);

    const { createdByName, month, area } = dcr || {};
    // Define table data and headers for each table
    const tables = [
      {
        title: "",
        data: [
          ["Name", "Month", "H.Q.", "Reporting Manager"],
          [createdByName, month, area, ""],
        ],
        columnStyles: {
          0: { cellWidth: "auto" },
          1: { cellWidth: "auto" },
          2: { cellWidth: "auto" },
          3: { cellWidth: "auto" },
          4: { cellWidth: "auto" },
          5: { cellWidth: "auto" },
          6: { cellWidth: "auto" },
        },
      },
      {
        title: "Doctor Details",
        data: [
          [
            "SR.NO",
            "Activity",
            "H.Q./E.X./O.S.",
            "Area",
            "Working With",
            "Expected Business",
          ],
          ...tp.map((i, index) => [
            index + 1,
            i?.Activity,
            i.area.split(",")[1],
            i.area.split(",")[0],
            i.workWith,
            i.ExpectedBuisness,
          ]),
        ],
        columnStyles: {
          0: { cellWidth: "auto" },
          1: { cellWidth: "auto" },
          2: { cellWidth: "auto" },
          3: { cellWidth: "auto" },
          4: { cellWidth: "auto" },
          5: { cellWidth: "auto" },
        },
      },
    ];

    // Loop through each table and render it in the PDF
    let startY = 100;
    tables.forEach((table) => {
      doc.setFontSize(7);
      // doc.text(table.title, 40, startY);
      // startY += 5;

      doc.autoTable({
        startY,
        head: table.data.slice(0, 1),
        body: table.data.slice(1),
        theme: "grid",
        styles: {
          fontSize: 7,
          textColor: [0, 0, 0],
          lineColor: [0, 0, 0],
          lineWidth: 0.1,
        },
        columnStyles: table.columnStyles,
      });

      startY = doc.autoTable.previous.finalY + 10;
    });

    // Save the PDF
    doc.save("DCR-Report");
  };

  return (
    <>
      <div className="flex flex-row gap-5">
        {sizes.map((size) => (
          <>
            <div className="flex flex-row  gap-5" key={size}>
              <Button
                size="sm"
                onClick={() => getTp(dcr?.DcrId)}
                color="primary"
              >
                Download Report
              </Button>
            </div>
          </>
        ))}
      </div>

      {/* <div
        id="report"
        className="flex flex-col gap-5 justify-center items-center"
      >
        <div className=" flex flex-col justify-center   max-w-[800px]    h-full">
          <ExecutiveInfo AllDocByDate={AllDocByDate} dcrID={dcrID} />
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
          <BootomDtails cTotal={clen} dtotal={Dlen} sTotal={slen} />
        </div>
      </div> */}
    </>
  );
}
