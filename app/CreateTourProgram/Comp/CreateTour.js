"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import doc from "../../img/doc.webp";
import { Chip } from "@nextui-org/react";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";
import TourDateList from "./TourDateList";
import Link from "next/link";

export default function CreateTour({ TpData, getDataTour }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const sizes = ["5xl"];

  const { allArea } = useGlobalContext();

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  const [formData, setFormData] = React.useState({
    Date: "",
    workWith: "",
    area: "",
    Activity: "",
    ExpectedBuisness: "",
    createdAt: new Date().toISOString().slice(0, 10),
    DcrId: "",
    Id: "",
    Act: true,
    Apv: true,
    submited: true,
  });

  React.useEffect(() => {
    // Destructure the properties from the 'item'
    const {
      Date,
      workWith,
      area,
      Activity,
      ExpectedBuisness,
      createdAt,
      Id,
      DcrId,
      Act,
      Apv,
      submited,
    } = TpData;

    // Update the 'formData' state with the values from 'item'
    setFormData({
      Date,
      workWith,
      area,
      Activity,
      ExpectedBuisness,
      createdAt,
      DcrId,
      Id,
      Act,
      Apv,
      submited,
    });
  }, [TpData]);

  formData.DcrId = TpData.DcrId;
  formData.Date = TpData.Date;
  formData.Id = Date.now();

  var displaySelect = false;

  if (formData.Activity === "Holiday") {
    formData.ExpectedBuisness = formData.Activity;
    formData.area = formData.Activity;
    formData.workWith = formData.Activity;
    formData.createdAt = new Date().toISOString().slice(0, 10);
    formData.Act = true;
    formData.Apv = true;
    formData.submited = true;
    displaySelect = true;
  }
  if (formData.Activity === "Sunday") {
    formData.ExpectedBuisness = formData.Activity;
    formData.area = formData.Activity;
    formData.workWith = formData.Activity;
    formData.createdAt = new Date().toISOString().slice(0, 10);
    formData.Act = true;
    formData.Apv = true;
    formData.submited = true;
    displaySelect = true;
  }
  if (formData.Activity === "Administration") {
    formData.ExpectedBuisness = formData.Activity;
    formData.area = formData.Activity;
    formData.workWith = formData.Activity;
    formData.createdAt = new Date().toISOString().slice(0, 10);
    formData.Act = true;
    formData.Apv = true;
    formData.submited = true;
    displaySelect = true;
  }
  if (formData.Activity === "Meeting") {
    formData.ExpectedBuisness = formData.Activity;
    formData.area = formData.Activity;
    formData.workWith = formData.Activity;
    formData.createdAt = new Date().toISOString().slice(0, 10);
    formData.Act = true;
    formData.Apv = true;
    formData.submited = true;
    displaySelect = true;
  }
  if (formData.Activity === "Working") {
    formData.createdAt = new Date().toISOString().slice(0, 10);
    formData.Act = true;
    formData.Apv = true;
    formData.submited = true;
    displaySelect = false;
  }

  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.Date) {
      newErrors.Date = "Date is required";
    }
    if (!formData.workWith) {
      newErrors.workWith = "workWith is required";
    }
    if (!formData.area) {
      newErrors.area = "area Name is required";
    }
    if (!formData.Activity) {
      newErrors.Activity = "Activity is required";
    }
    if (!formData.ExpectedBuisness) {
      newErrors.ExpectedBuisness = "ExpectedBuisness is required";
    }
    if (!formData.DcrId) {
      newErrors.DcrId = "DcrId is required";
    }

    // Add similar validation for other fields

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [response, setResponse] = React.useState({});

  const Server = process.env.NEXT_PUBLIC_SERVER_NAME;

  const handleSubmit = (dcrid) => {
    if (validateForm()) {
      const apiUrl = `${Server}/add/tourDate`;
      setIsLoading(true);
      setHasError(false);

      axios
        .post(apiUrl, formData)
        .then((response) => {
          const responseData = response.data;
          setResponse(responseData);
          toast.success(
            response?.data?.message === undefined
              ? "Tour program Updated"
              : `${response?.data?.message}`
          );
          setIsLoading(true);
        })
        .catch((error) => {
          setHasError(true);
          toast.error(error?.response?.data?.message);
        })
        .finally(() => {
          setIsLoading(false);

          getDataTour(dcrid);
          onClose();
        });
    } else {
      toast.error("Please fill All Details");
    }
  };

  const handleSendApproval = (id, status) => {
    const Server = process.env.NEXT_PUBLIC_SERVER_NAME;

    const apiUrl = `${Server}/add/tour/${id}`;
    setIsLoading(true);
    setHasError(false);

    axios
      .put(apiUrl, { SendToApproved: status })
      .then((response) => {
        const responseData = response.data;
        setResponse(responseData);

        toast.success(
          status === true
            ? "Request To Appove Sended "
            : "Request To UnAppove Sended ! "
        );
      })
      .catch((error) => {
        setHasError(true);
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
        setFormData({
          startDate: "",
          lastDate: "",
          area: "",
          DcrId: "",
        });

        onClose();
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

      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <>
            <div className="flex flex-row gap-4" key={size}>
              <Button
                size="sm"
                onClick={() => handleOpen(size)}
                className="text-xs font-semibold bg-black text-white p-2 rounded-lg"
              >
                Update
              </Button>
              {/* <Dropdown>
                    <DropdownTrigger>
                      <Button className="text-white bg-black font-semibold ">
                        Sent To Approve
                      </Button>
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
                            onClick={() =>
                              handleSendApproval(ActiveDcr._id, true)
                            }
                            className="bg-black text-[10px] rounded-lg text-white p-1.5"
                          >
                            Send Approval
                          </p>
                          <p
                            onClick={() =>
                              handleSendApproval(ActiveDcr._id, false)
                            }
                            className="bg-black text-[10px] rounded-lg text-white p-1.5 "
                          >
                            UnSend Approval
                          </p>
                        </div>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
             */}
            </div>
          </>
        ))}
      </div>
      <Modal
        size={size}
        isOpen={isOpen}
        placement={`center`}
        scrollBehavior={`inside`}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add TourProgram
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4 justify-center items-center">
                  <div className="grid lg:grid-cols-2 grid-cols-1  gap-4">
                    <div className="flex flex-col justify-center ">
                      <p className="text-sm p-1 text-gray-600">Select Area</p>
                      <select
                        className="outline-none font-semibold text-gray-600 border-1 bg-transparent text-small w-[300px] h-[50px] rounded-lg bg-gray-200 p-2"
                        id="area"
                        name="area"
                        disabled={displaySelect}
                        value={formData.area}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Area</option>
                        {allArea?.areaData?.data?.map((i) => {
                          return (
                            <>
                              <option key={i} value={[i.AreaName, i.Type]}>
                                {i.AreaName}
                              </option>
                            </>
                          );
                        })}
                      </select>
                      {errors.area && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.area}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-center ">
                      <p className="text-sm p-1">Select Activity !</p>
                      <select
                        className="outline-none font-semibold text-gray-600 border-1 bg-transparent text-small w-[300px] h-[50px] rounded-lg bg-gray-200 p-2"
                        id="Activity"
                        name="Activity"
                        value={formData.Activity}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Activity</option>

                        <option value="Working">Working</option>
                        <option value="Holiday">Holiday</option>

                        <option value="Administration">Administration</option>
                        <option value="Metting">Meeting</option>
                      </select>
                      {errors.Activity && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.Activity}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-center ">
                      <p className="text-sm p-1">Select Workwith !</p>
                      <select
                        className="outline-none font-semibold text-gray-600 border-1 bg-transparent text-small w-[300px] h-[50px] rounded-lg bg-gray-200 p-2"
                        id="workWith"
                        name="workWith"
                        disabled={displaySelect}
                        value={formData.workWith}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Workwith</option>
                        <option value="Independent">Independent</option>
                        <option value="Sale manager">Sale manager</option>
                        <option value="Buisness Devlopment Executive">
                          Buisness Devlopment Executive
                        </option>
                        <option value="Zonal Sales Manager">
                          Zonal Sales Manager
                        </option>
                        <option value="Area Buisness Manager">
                          Area Buisness Manager
                        </option>
                        <option value="Reginol Sales Manager">
                          Regional Sales Manager
                        </option>
                        <option value="Teretory Executive">
                          Teretory Executive
                        </option>
                      </select>
                      {errors.Activity && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.Activity}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-center ">
                      <Input
                        type="text"
                        label="ExpectedBuisness"
                        name="ExpectedBuisness"
                        disabled={displaySelect}
                        value={formData.ExpectedBuisness}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.ExpectedBuisness && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.ExpectedBuisness}
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>
                {isLoading ? (
                  <Button
                    isLoading
                    className="bg-black text-white"
                    spinner={
                      <svg
                        className="animate-spin h-5 w-5 text-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          fill="currentColor"
                        />
                      </svg>
                    }
                  >
                    Wait..
                  </Button>
                ) : (
                  <Button
                    color="black"
                    className="bg-black text-white"
                    onClick={() => handleSubmit(TpData)}
                  >
                    Update
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="flex justify-center items-center mb-16">
        {/* <TourDateList dataTour={dataTour} getDataTour={getDataTour} /> */}
      </div>
    </>
  );
}
