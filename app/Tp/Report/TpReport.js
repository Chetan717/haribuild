"use client";

import { ToastContainer, toast } from "react-toastify";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
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

    axios
      .get(`${Server}/add/tourDateUser/${dcr}`)
      .then((res) => {
        setTp(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
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
        title: "Avirosa Pharmachem Tour Program Report",
        data: [
          ["Name", "Month", "Area", "Reporting Manager"],
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
        title: "",
        data: [
          [
            "SR.NO",
            "Date",
            "Activity",
            "H.Q./E.X./O.S.",
            "Area",
            "Working With",
            "Expected Business",
          ],
          ...tp.map((i, index) => [
            index + 1,
            i?.Date,
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
          6: { cellWidth: "auto" },
        },
      },
    ];

    // Loop through each table and render it in the PDF
    let startY = 100;
    tables.forEach((table) => {
      doc.setFontSize(15);
      doc.text(table.title, 150, startY);
      startY += 5;

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
    doc.save(`TP-${createdByName}`);
  };

  return (
    <>
      <div className="flex flex-row gap-5">
        {sizes.map((size) => (
          <>
            <div className="flex flex-row  gap-5" key={size}>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    size="sm"
                    onClick={() => getTp(dcr?.DcrId)}
                    color="primary"
                  >
                    Download Report
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Dropdown Variants"
                  color="default"
                  variant="solid"
                >
                  <DropdownItem
                    key="delete"
                    onClick={generatePdf}
                    className="text-danger"
                    color="danger"
                  >
                    Confirm Download
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
