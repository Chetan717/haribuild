"use client";
import React, { useEffect, useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import axios from "axios";
import { Spinner } from "@nextui-org/react";
import moment from "moment";
moment().format();
import Approvedtp from "./Approvedtp";
import UnApproved from "./UnApproved";
import Activetp from "./ActiveTp";
import Expiredtp from "./ExpiredTp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SendedToApv from "./SendedToApv";

export default function MainTp() {
  const variants = ["underlined"];

  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [response, setResponse] = React.useState({});

  const Server = process.env.NEXT_PUBLIC_SERVER_NAME;

  const setApproved = (id, status, getTp) => {
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
        getTp();
      });
  };

  const setActive = (id, status, getTp) => {
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
        getTp();
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
      });
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="flex w-full justify-center items-center flex-col">
        {variants.map((variant) => (
          <Tabs
            key={variant}
            variant={variant}
            className=""
            aria-label="Tabs variants"
          >
            <Tab key="Reqeusted To Approve" title="Reqeusted To Approve">
              <Card>
                <CardBody className="grid grid-cols-1 gap-4">
                  <SendedToApv
                    setApproved={setApproved}
                    HandleDelete={HandleDelete}
                  />
                </CardBody>
              </Card>{" "}
            </Tab>
            <Tab key="Approved" title="Approved">
              <Card>
                <CardBody className="grid grid-cols-1 gap-4">
                  <Approvedtp
                    setApproved={setApproved}
                    HandleDelete={HandleDelete}
                  />
                </CardBody>
              </Card>{" "}
            </Tab>
            <Tab key="UnApproved" title="UnApproved">
              <Card>
                <CardBody className="grid grid-cols-1 gap-4">
                  <UnApproved
                    setApproved={setApproved}
                    HandleDelete={HandleDelete}
                  />
                </CardBody>
              </Card>{" "}
            </Tab>
            <Tab key="Active" title="Active">
              <Card>
                <CardBody className="grid grid-cols-1 gap-4">
                  <Activetp setActive={setActive} HandleDelete={HandleDelete} />
                </CardBody>
              </Card>{" "}
            </Tab>
            <Tab key="Expired" title="Expired">
              <Card>
                <CardBody className="grid grid-cols-1 gap-4">
                  <Expiredtp
                    setActive={setActive}
                    HandleDelete={HandleDelete}
                  />
                </CardBody>
              </Card>{" "}
            </Tab>
          </Tabs>
        ))}
      </div>
    </>
  );
}
