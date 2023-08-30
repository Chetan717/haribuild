"use client";
import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import shop from "../../../img/shop.webp";
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
import { Input } from "@nextui-org/react";

import { CustomCheckbox } from "./styleComp/CustomCheckbox";
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";
export default function AddStockiest() {
  const Server = process.env.NEXT_PUBLIC_SERVER_NAME;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const sizes = ["5xl"];
  const { AreasOption } = useGlobalContext();
  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  const [formData, setFormData] = React.useState({
    Code: "",
    Name: "",
    mobile: "",
    address: "",
    Area: "",
    Active: true,
    approved: true,
  });

  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.Code) {
      newErrors.Code = "ist Code is required";
    }
    if (!formData.Name) {
      newErrors.Name = "Chemist Name is required";
    }
    if (!formData.mobile) {
      newErrors.mobile = "Mobile No. is required";
    }
    if (!formData.address) {
      newErrors.address = "Address is required";
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

  const handleSubmit = () => {
    if (validateForm()) {
      const apiUrl = `${Server}/add/stock`;
      setIsLoading(true);
      setHasError(false);

      axios
        .post(apiUrl, formData)
        .then((response) => {
          const responseData = response.data;
          setResponse(responseData);

          if (response.status === 200) {
            // Perform any necessary actions on success
            notify();
          } else {
            setHasError(true);
          }
        })
        .catch((error) => {
          setHasError(true);
          toast.error(error?.message || "Something Went Wrong !");
        })
        .finally(() => {
          setIsLoading(false);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
    } else {
      toast.error("Please fill All Details");
    }
  };

  const notify = () => {
    toast.success(response.message || " Stockiest Added Successfuly !");
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
          <Button
            key={size}
            size="lg"
            className="text-black font-bold "
            onPress={() => handleOpen(size)}
          >
            + Add Stockiest
          </Button>
        ))}
      </div>
      <Modal
        size={size}
        isOpen={isOpen}
        scrollBehavior={`inside`}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Stockiest
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4 justify-center items-center">
                  <div className="grid lg:grid-cols-2 grid-cols-1  gap-4">
                    <div className="flex flex-col justify-center ">
                      <Input
                        type="text"
                        label="Stokiest Code"
                        name="Code"
                        value={formData.Code}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.Code && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.Code}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-center ">
                      <Input
                        type="text"
                        label="stockist Name"
                        name="Name"
                        value={formData.Name}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.Name && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.Name}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-center ">
                      <Input
                        type="tel"
                        label="Mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.mobile && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.mobile}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col justify-center ">
                      <select
                        className="outline-none font-semibold text-gray-600 border-1 bg-transparent text-small w-[300px] h-[50px] rounded-lg bg-gray-200 p-2"
                        id="Area"
                        name="Area"
                        value={formData.Area}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Area</option>
                        {AreasOption?.map((a) => {
                          return (
                            <>
                              <option key={a} value={a}>
                                {a}
                              </option>
                            </>
                          );
                        })}
                      </select>
                      {errors.Area && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.Area}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-center ">
                      <Input
                        type="textarea"
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.address && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.address}
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
                    onClick={handleSubmit}
                  >
                    Save
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
