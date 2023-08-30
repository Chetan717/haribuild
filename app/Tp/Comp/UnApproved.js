"use client";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import edit from "../../img/edit.webp";
import del from "../../img/delete.webp";
import Image from "next/image";
import moment from "moment";
moment().format();
import { Card, CardBody } from "@nextui-org/react";
import axios from "axios";
import { Spinner } from "@nextui-org/react";

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

export default function Approvedtp({ setApproved, HandleDelete }) {
  const Server = process.env.NEXT_PUBLIC_SERVER_NAME;
  const [tp, setTp] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTp();
  }, []);

  const getTp = () => {
    const Server = process.env.NEXT_PUBLIC_SERVER_NAME;
    setLoading(true);
    axios
      .get(`${Server}/add/tour`)
      .then((res) => {
        setTp(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const UnActiveProgram = tp?.filter(
    (itm) => itm.Act === true && itm.Apv === false
  );

  if (loading) {
    return (
      <>
        <div className="flex flex-row gap-5 justify-center items-center  ">
          <Spinner />
          <p>Data is loaded Wait....</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        {UnActiveProgram?.length === 0 ? (
          <p>No Data Available...</p>
        ) : (
          UnActiveProgram?.map((i) => {
            return (
              <>
                <Card>
                  <CardBody className="flex flex-col gap-1 justify-center items-center">
                    <p>
                      {/* Make beautiful websites regardless of your design
                    experience. Act : true Apv : true DcrId : "1693145736871"
                    SendToApproved : false area : ['sangmaner'] createdAt :
                    "2023-08-27T00:00:00.000Z" createdBy : "Vijay123"
                    createdByName : "Vijay S Wakchaure" lastDate :
                    "2023-08-31T00:00:00.000Z" month : "August" post : "Sale
                    manager" startDate : "2023-08-25T00:00:00.000Z" __v : 0 _id */}
                    </p>
                    <p className="text-xs font-bold">{i.createdByName}</p>
                    <p className="text-xs font-gray-600"> {i.month}</p>
                    {i?.area.map((i) => {
                      return (
                        <>
                          <p className="text-xs font-gray-600">{i}</p>
                        </>
                      );
                    })}
                    <p className="text-xs font-gray-600">
                      {moment(i.startDate).format("DD/MM/YYYY")}_to_
                      {moment(i.lastDate).format("DD/MM/YYYY")}
                    </p>
                    <div className="flex flex-row gap-3 mt-2 justify-center items-center">
                      {/* <Image
                      className="cursor-pointer"
                      src={edit}
                      width={20}
                      height={20}
                      alt="icons"
                    />

                    <Dropdown>
                      <DropdownTrigger>
                        <Image
                          className="cursor-pointer"
                          src={del}
                          width={20}
                          height={20}
                          alt="icons"
                        />
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Dropdown Variants"
                        color="default"
                        variant="solid"
                      >
                        <DropdownItem
                          key="delete"
                          className="text-danger"
                          color="danger"
                        >
                          Confirm Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown> */}

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
                                onClick={() => setApproved(i._id, true, getTp)}
                                className="bg-black text-xs rounded-lg text-white p-1.5"
                              >
                                Appoved
                              </p>
                              <p
                                onClick={() => setApproved(i._id, false, getTp)}
                                className="bg-black text-xs rounded-lg text-white p-1.5 "
                              >
                                UnAppoved
                              </p>
                            </div>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </CardBody>
                </Card>
              </>
            );
          })
        )}
      </>
    );
  }
}
