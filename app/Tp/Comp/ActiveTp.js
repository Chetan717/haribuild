"use client";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Card,
  CardBody,
} from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import edit from "../../img/edit.webp";
import del from "../../img/delete.webp";
import Image from "next/image";
import moment from "moment";
moment().format();
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";
import { Spinner } from "@nextui-org/react";
import EditTour from "./ActiveTpEdit/EditTour";
import TpReport from "../Report/TpReport";

export const CheckIcon = ({ size, height, width, ...props }) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
        fill="currentColor"
      />
    </svg>
  );
};
export default function ActiveTp({
  setActive,
  HandleDelete,
  TourProgramData,
  loading,
  setApproved,
}) {
  if (loading) {
    return (
      <div className=" mt-10 mb-10">
        <Spinner />
      </div>
    );
  }

  if (TourProgramData?.length === 0) {
    return (
      <>
        <div className=" mt-10  mb-10">
          <p>Oops Data Not Available...!</p>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="grid grid-cols-2 gap-3 p-2">
        {TourProgramData?.map((i) => {
          return (
            <>
              <Card key={i}>
                <CardBody className="flex flex-col gap-1 justify-Start items-start">
                  <p className="text-sm font-bold">{i.createdByName}</p>

                  <p className="text-xs font-gray-600"> {i.month}</p>
                  <p className="text-xs font-gray-600 bg-blue-100 p-2 font-bold rounded-lg">
                    {moment(i.startDate).format("DD/MM/YYYY")}_to_
                    {moment(i.lastDate).format("DD/MM/YYYY")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {i.area?.map((i) => {
                      return (
                        <>
                          <p key={i} className="text-xs font-gray-600">
                            {i},
                          </p>
                        </>
                      );
                    })}
                  </div>
                  <TpReport dcr={i} />
                  <div className="flex flex-row gap-3 mt-2 justify-center items-center">
                    <Dropdown className="cursor-pointer">
                      <DropdownTrigger className="cursor-pointer">
                        {i.Act === true ? (
                          <Chip
                            startContent={<CheckIcon size={18} />}
                            variant="faded"
                            color="success"
                          >
                            Active
                          </Chip>
                        ) : (
                          <Chip color="warning" variant="dot">
                            UnActive
                          </Chip>
                        )}
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Dropdown Variants"
                        color="default"
                        variant="solid"
                      >
                        <DropdownItem className="text-danger" color="default">
                          <div className="flex flex-row gap-3 ">
                            <p
                              onClick={() => setActive(i._id, true)}
                              className="bg-black text-xs rounded-lg text-white p-1.5"
                            >
                              Active
                            </p>
                            <p
                              onClick={() => setActive(i._id, false)}
                              className="bg-black text-xs rounded-lg text-white p-1.5 "
                            >
                              UnActive
                            </p>
                          </div>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>

                    <Dropdown className="cursor-pointer">
                      <DropdownTrigger className="cursor-pointer">
                        {i?.Apv === true ? (
                          <Chip
                            startContent={<CheckIcon size={18} />}
                            variant="faded"
                            color="success"
                          >
                            Approved
                          </Chip>
                        ) : (
                          <Chip color="warning" variant="dot">
                            UnApproved
                          </Chip>
                        )}
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Dropdown Variants"
                        color="default"
                        variant="solid"
                      >
                        <DropdownItem
                          key="delete"
                          className="text-danger"
                          color="default"
                        >
                          <div className="flex flex-row gap-3 ">
                            <p
                              onClick={() => setApproved(i._id, true)}
                              className="bg-black text-xs rounded-lg text-white p-1.5"
                            >
                              Appoved
                            </p>
                            <p
                              onClick={() => setApproved(i._id, false)}
                              className="bg-black text-xs rounded-lg text-white p-1.5 "
                            >
                              UnAppoved
                            </p>
                          </div>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>

                    <Chip color="warning" variant="dot">
                      {i.lastDate === Date.now()
                        ? "Today is last date"
                        : "LastDate" +
                          `:` +
                          moment(i.lastDate).format("DD/MM/YYYY")}
                    </Chip>
                    <EditTour
                      dcr={i}
                      setActive={setActive}
                      HandleDelete={HandleDelete}
                    />
                  </div>
                </CardBody>
                {moment(i.lastDate).format("DD/MM/YYYY") ===
                moment(new Date()).format("DD/MM/YYYY") ? (
                  <span class="absolute flex justify-end items-start  h-full w-full">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-25"></span>
                    <span class="m-2 inline-flex text-black bg-yellow-400 shadow-lg p-2 rounded-lg text-xs font-bold">
                      {" "}
                      🛑 Today is Expiry!
                    </span>
                  </span>
                ) : null}{" "}
              </Card>
            </>
          );
        })}
      </div>
    </>
  );
}
