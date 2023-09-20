"use client";
import React, { useEffect, useState } from "react";
import ActiveTp from "./ActiveTp";
import axios from "axios";
import moment from "moment";
moment().format();
import { useQuery, gql } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Filters from "./Filters/Filters";

export default function MainTp() {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", {
    month: "long",
  });

  const [month, setMonth] = React.useState(currentMonth);
  const [status, setStatus] = React.useState("Active");

  const GET_TOUR_DATA = gql`
    query Query($month: String!) {
      TourProgram(month: $month) {
        TourProgram {
          _id
          startDate
          lastDate
          post
          area
          month
          createdBy
          createdByName
          createdAt
          DcrId
          Useable
          SentToApv
          Act
          Apv
        }
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_TOUR_DATA, {
    variables: { month: month },
  });

  const TourProgramData = data?.TourProgram?.TourProgram;

  const GetFilteredData = (status, TourProgramData) => {
    if (status === "Approved") {
      const apvData = TourProgramData?.filter((i) => i.Apv === true);
      return apvData;
    }
    if (status === "UnApproved") {
      const apvData = TourProgramData?.filter((i) => i.Apv === false);
      return apvData;
    }
    if (status === "Expired") {
      const apvData = TourProgramData?.filter((i) => i.Act === false);
      return apvData;
    }
    if (status === "Active") {
      const apvData = TourProgramData?.filter((i) => i.Act === true);
      return apvData;
    }
    return TourProgramData;
  };

  const TourFilteredData = GetFilteredData(status, TourProgramData);
  const variants = ["underlined"];

  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [response, setResponse] = React.useState({});

  const Server = process.env.NEXT_PUBLIC_SERVER_NAME;

  const setApproved = (id, status) => {
    const apiUrl = `${Server}/add/tour/${id}`;
    setIsLoading(true);
    setHasError(false);

    axios
      .put(apiUrl, { Apv: status })
      .then((response) => {
        const responseData = response?.data;
        setResponse(responseData);
        toast.success(`${response?.data?.message}`);
      })
      .catch((error) => {
        setHasError(true);
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
        refetch(GET_TOUR_DATA);
      });
  };

  const setActive = (id, status) => {
    const apiUrl = `${Server}/add/tour/${id}`;
    setIsLoading(true);
    setHasError(false);

    axios
      .put(apiUrl, { Act: status })
      .then((response) => {
        const responseData = response.data;
        setResponse(responseData);
        toast.success(`${response?.data?.message}`);
      })
      .catch((error) => {
        setHasError(true);
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
        refetch(GET_TOUR_DATA);
      });
  };

  const HandleDelete = (idparam) => {
    const apiUrl = `${Server}/add/tour/${idparam}`;
    setIsLoading(true);
    setHasError(false);

    axios
      .delete(apiUrl)
      .then((response) => {
        const responseData = response.data;
        setResponse(responseData);

        toast.success(`${response?.data?.message}`);
      })
      .catch((error) => {
        setHasError(true);
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
        refetch(GET_TOUR_DATA);
      });
  };

  return (
    <>
      <div className="flex w-full justify-center items-center flex-col gap-4">
        <Filters
          month={month}
          setMonth={setMonth}
          status={status}
          setStatus={setStatus}
        />
        <ActiveTp
          setActive={setActive}
          HandleDelete={HandleDelete}
          TourProgramData={TourFilteredData}
          loading={loading}
          setApproved={setApproved}
        />
      </div>
    </>
  );
}
