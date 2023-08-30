"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import axios from "axios";
import { Spinner } from "@nextui-org/react";
import moment from "moment";
import CreateTour from "./CreateTour";
import TourDateList from "./TourDateList";

moment().format();

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

export default function ListByDate({ dcr }) {
  const Server = process.env.NEXT_PUBLIC_SERVER_NAME;
  const [tp, setTp] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
   
    setLoading(true);
    axios
      .get(`${Server}/add/tourDateUser/${user.userId}`)
      .then((res) => {
        setTp(res.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message) || "Network Error";
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const ActiveProgram = tp?.filter(
    (itm) => itm.Act === true && itm.Apv === false
  );

  const Active = { ...ActiveProgram };

  const start_date = new Date(Active[0]?.startDate);
  const end_date = new Date(Active[0]?.lastDate);

  const dates = [];

  while (start_date <= end_date) {
    dates.push(moment(start_date).format("DD/MM/YYYY"));
    start_date.setDate(start_date.getDate() + 1);
  }
  const TodayDate = dates.filter(
    (i) => i === moment(new Date()).format("DD/MM/YYYY")
  );

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <Spinner className="relative bottom-[60px]" />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-col gap-5 mt-5 justify-center items-center">
          <div className="flex justify-center items-center">
            {ActiveProgram?.map((i) => {
              return (
                <>
                  <Card key={i.startDate} className="py-3">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col gap-2 items-center">
                      <h4 className="font-semibold bg-gray-100 bg-blend-saturation p-1 rounded-lg text-sm">
                        {moment(i.startDate).format("DD/MM/YYYY")}_to_
                        {moment(i.lastDate).format("DD/MM/YYYY")}
                      </h4>
                      <p className="p-1  text-sm inline-flex justify-center items-center flex-col gap-1 font-semibold">
                        {i.createdByName}{" "}
                        <span className="text-xs  font-semibold text-gray-700">
                          {i.post}
                        </span>
                        <span className="text-xs  font-semibold text-gray-700">
                          {i.area}
                        </span>
                      </p>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                      <div className="flex flex-col justify-center items-center gap-3 p-2">
                        <div className="flex flex-row gap-3">
                          {i.Act === true ? (
                            <Chip
                              startContent={<CheckIcon size={18} />}
                              variant="faded"
                              color="success"
                            >
                              Active
                            </Chip>
                          ) : (
                            <Chip color="danger" variant="dot">
                              UnApproved
                            </Chip>
                          )}

                          {i.Apv === true ? (
                            <Chip
                              startContent={<CheckIcon size={18} />}
                              variant="faded"
                              color="success"
                            >
                              Approved
                            </Chip>
                          ) : (
                            <Chip color="danger" variant="dot">
                              UnApproved
                            </Chip>
                          )}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </>
              );
            })}
          </div>
        </div>
        {/* <CreateTour dates={dates} /> */}
        <TourDateList
          dates={dates}
          dcr={Active[0]?.DcrId}
          ActiveDcr={Active[0]}
        />
      </>
    );
  }
}
