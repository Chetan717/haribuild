"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import edit from "../../img/edit.webp";
import del from "../../img/delete.webp";
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
import { Input } from "@nextui-org/react";
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";
import TourDateList from "./TourDateList";

export default function EditTourDate({ item, getDataTour }) {
  const { allArea } = useGlobalContext();


  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const sizes = ["5xl"];

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
      DcrId,
      Act,
      Apv,
      submited,
    } = item || {};

    // Update the 'formData' state with the values from 'item'
    setFormData({
      Date,
      workWith,
      area,
      Activity,
      ExpectedBuisness,
      createdAt,
      DcrId,
      Act,
      Apv,
      submited,
    });
  }, [item]);

  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.Date) {
      newErrors.Date = "Date is required";
    }
    if (!formData.workWith) {
      newErrors.workWith = "workWith is required";
    }
    if (formData.area.length === 0) {
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

  const handleSubmit = (id) => {
    if (validateForm()) {
      const apiUrl = `${Server}/add/tourDate/${id}`;
      setIsLoading(true);
      setHasError(false);

      axios
        .put(apiUrl, formData)
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
          onClose();
          getDataTour();
        });
    } else {
      toast.error("Please fill All Details");
    }
  };

  const handleDelete = (idparam) => {
    const apiUrl = `${Server}/add/tourDate/${idparam}`;
    setIsLoading(true);
    setHasError(false);

    axios
      .delete(apiUrl, formData)
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
        getDataTour()
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

      {sizes.map((size) => (
        <>
          <div className="flex flex-row gap-3" key={size}>
            <Image
              onClick={() => handleOpen(size)}
              width={20}
              height={20}
              alt="icon"
              src={edit}
            />
            <Image
              onClick={() => handleDelete(item._id)}
              width={20}
              height={20}
              alt="icon"
              src={del}
            />
          </div>
        </>
      ))}

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
                Add Tour Program
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
                      <p className="text-sm p-1">select ACtivity !</p>
                      <select
                        className="outline-none font-semibold text-gray-600 border-1 bg-transparent text-small w-[300px] h-[50px] rounded-lg bg-gray-200 p-2"
                        id="Activity"
                        name="Activity"
                        value={formData.Activity}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select ACtivity</option>

                        <option value="working">Working</option>
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
                        value={formData.workWith}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Workwith</option>
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
                          Reginol Sales Manager
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
                    onClick={() => handleSubmit(item?._id)}
                  >
                    Update
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
