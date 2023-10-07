"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, ButtonToolbar, Button, Placeholder } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import { Card, CardFooter, Image } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import moment from "moment";
import ReportTemp from "@/app/Report/ReportTemplate/ReportTemp";
moment().format();
export default function DCrShow({ dcrID, selID }) {
  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState();
  const Server = process.env.NEXT_PUBLIC_SERVER_NAME;
  const [allDoc, setAllDoc] = useState([]);
  const [allChem, setAllChem] = useState([]);

  const [allStockiest, setAllStockiest] = useState([]);

  const handleOpen = async (value, id) => {
    setSize(value);
    setOpen(true);

    try {
      const [docResponse, chemResponse, stockResponse] = await axios.all([
        axios.get(`${Server}/add/docTourId/${id}`),
        axios.get(`${Server}/add/chemTourId/${id}`),
        axios.get(`${Server}/add/stockTourId/${id}`),
      ]);

      setAllDoc({
        docData: docResponse.data,
      });
      setAllChem({
        chemData: chemResponse.data,
      });

      setAllStockiest({
        stockData: stockResponse.data,
      });
    } catch (error) { }
  };

  const handleClose = () => setOpen(false);

  const [seldate, setSeldate] = useState();

  const sendDate = (start_date, end_date) => {
    const dates = [];

    while (start_date <= end_date) {
      dates.push(moment(start_date).format("DD/MM/YYYY"));
      start_date.setDate(start_date.getDate() + 1);
    }
    return dates;
  };

  const AllDocByDate = allDoc?.docData?.filter(
    (i) => moment(i.createdAt).format("DD/MM/YYYY") === seldate
  );
  const AllChemByDate = allChem?.chemData?.filter(
    (i) => moment(i.createdAt).format("DD/MM/YYYY") === seldate
  );
  const AllStockByDate = allStockiest?.stockData?.filter(
    (i) => moment(i.createdAt).format("DD/MM/YYYY") === seldate
  );

  return (
    <>
      <Button
        size="sm"
        className="text-xs text-black font-semibold"
        color="primary"
        onClick={() => handleOpen("full", selID)}
      >
        VIEW DCR
      </Button>

      <Modal size={size} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="h-full">
          <div className="flex flex-col gap-5 justify-center items-center ">
            <p className="text-xl font-bold ">Tour Programs of {selID} !</p>
            <div className="flex flex-col justify-center items-center gap-10">
              <div className="flex flex-col justify-center ">
                <select
                  className="outline-none font-semibold text-gray-600 border-1 bg-transparent text-small w-[300px] h-[50px] rounded-lg bg-gray-200 p-2"
                  id="seldate"
                  name="seldate"
                  value={seldate}
                  onChange={(e) => setSeldate(e.target.value)}
                  required
                >
                  <option value="">Select Date</option>
                  {sendDate(
                    new Date(dcrID?.map((i) => i.startDate)),
                    new Date(dcrID?.map((i) => i.lastDate))
                  )?.map((i) => {
                    return (
                      <>
                        <option key={i} value={i}>
                          {i}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>

              <ReportTemp
                AllDocByDate={AllDocByDate}
                AllChemByDate={AllChemByDate}
                AllStockByDate={AllStockByDate}
                dcrID={dcrID}
                seldate={seldate}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
