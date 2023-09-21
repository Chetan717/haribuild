"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";
import { Input } from "@nextui-org/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddStdFarChart({ RefetchData, DataFetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const { AreasOption, headquaters } = useGlobalContext();

  const sizes = ["5xl"];

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  const [formData, setFormData] = React.useState({
    FareName: "",
    HeadQuaterName: "",
    AreaName: "",
    OneWayKM: "",
    FarePrice: "",
    TravelMode: "",
    Active: true,
  });

  formData.FareName =
    `${formData.HeadQuaterName}` + `${"_to_"}` + `${formData.AreaName}`;

  // formData.Type = typSel;
  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};

    if (formData.HeadQuaterName.length <= 3) {
      newErrors.HeadQuaterName = "HeadQuater Name is required";
    }
    if (!formData.OneWayKM) {
      newErrors.OneWayKM = "OneWayKM is required";
    }

    if (!formData.FarePrice) {
      newErrors.FarePrice = "FarePrice is required";
    }
    if (!formData.TravelMode) {
      newErrors.TravelMode = "TravelMode is required";
    }

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
  const handleSubmit = () => {
    if (validateForm()) {
      const apiUrl = `${Server}/add/stdfare`;
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
          setFormData({
            FareName: "",
            HeadQuaterName: "",
            AreaName: "",
            OneWayKM: "",
            FarePrice: "",
            TravelMode: "",
          });
          RefetchData(DataFetch);
        });
    } else {
      toast.error("Please fill All Details");
    }
  };

  const notify = () => {
    toast.success(
      response?.message || " Standard Fare Chart Added Successfuly !"
    );
  };
  // const Types = ["HQ", "EX", "OS"];
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
            + Add_Std_Fare_Chart 💹
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
                Add_Std_Fare_Chart 💹
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4 justify-center items-center">
                  <div className="grid lg:grid-cols-2 grid-cols-1  gap-4">
                    <div className="flex flex-col justify-center ">
                      <select
                        className="outline-none border-1 border-gray-400 font-semibold text-gray-600  bg-transparent text-small w-[300px] h-[50px] rounded-lg bg-gray-200 p-2"
                        id="HeadQuaterName"
                        name="HeadQuaterName"
                        value={formData.HeadQuaterName}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select HeadQuater⛳️</option>
                        {headquaters?.map((i) => {
                          return (
                            <>
                              <option key={i} value={i}>
                                {i}
                              </option>
                            </>
                          );
                        })}
                      </select>
                      {errors.HeadQuaterName && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.HeadQuaterName}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-center ">
                      <select
                        className="outline-none border-1  border-gray-400 font-semibold text-gray-600  bg-transparent text-small w-[300px] h-[50px] rounded-lg bg-gray-200 p-2"
                        id="AreaName"
                        name="AreaName"
                        value={formData.AreaName}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select AreaName</option>
                        {AreasOption?.map((i) => {
                          return (
                            <>
                              <option key={i} value={i}>
                                {i}
                              </option>
                            </>
                          );
                        })}
                      </select>
                      {errors.AreaName && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.AreaName}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-center ">
                      <Input
                        type="text"
                        label="FareName"
                        name="FareName"
                        value={formData.FareName}
                        onChange={handleInputChange}
                        required
                        className="w-3/1"
                      />
                      {errors.FareName && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.FareName}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-center ">
                      <Input
                        type="number"
                        label="OneWayKM"
                        name="OneWayKM"
                        value={formData.OneWayKM}
                        onChange={handleInputChange}
                        required
                        className="w-3/1"
                      />
                      {errors.OneWayKM && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.OneWayKM}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-center ">
                      <Input
                        type="number"
                        label="FarePrice"
                        name="FarePrice"
                        value={formData.FarePrice}
                        onChange={handleInputChange}
                        required
                        className="w-3/1"
                      />
                      {errors.FarePrice && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.FarePrice}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-center ">
                      <select
                        className="outline-none  border-1 border-gray-400 font-semibold text-gray-600  bg-transparent text-small w-[300px] h-[50px] rounded-lg bg-gray-100 p-2"
                        id="TravelMode"
                        name="TravelMode"
                        value={formData.TravelMode}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select TravelMode</option>
                        <option value="Bike">Bike</option>
                        <option value="Bus">Bus</option>
                        <option value="Train">Train</option>
                      </select>
                      {errors.TravelMode && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.TravelMode}
                        </p>
                      )}
                    </div>

                    {/* <div className="flex flex-col gap-4 justify-center items-center ">
                      <div className="flex flex-row gap-4 justify-center items-center">
                        {Types.map((itm) => {
                          return (
                            <>
                              <p
                                onClick={() => setTypSel(itm)}
                                className={
                                  itm === typSel
                                    ? ` font-semibold bg-black text-white cursor-pointer rounded-lg p-2`
                                    : `bg-gray-200 text-black font-semibold cursor-pointer hover:bg-black hover:text-white rounded-lg p-2`
                                }
                                key={itm}
                              >
                                {itm}
                              </p>
                            </>
                          );
                        })}
                      </div>
                      {errors.Type && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.Type}
                        </p>
                      )}
                    </div> */}
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
