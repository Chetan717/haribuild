"use client";
import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
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

export default function AddHeadQ({ RefetchData, DataFetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const [typSel, setTypSel] = React.useState("");
  const sizes = ["xl"];

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  const [formData, setFormData] = React.useState({
    HeadQuaterName: "",
    Active: true,
  });

  // formData.Type = typSel;
  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};

    if (formData.HeadQuaterName.length <= 3) {
      newErrors.HeadQuaterName = "HeadQuater Name is required";
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
      const apiUrl = `${Server}/add/headq`;
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
          setFormData({ HeadQuaterName: "" });
          RefetchData(DataFetch);
        });
    } else {
      toast.error("Please fill All Details");
    }
  };

  const notify = () => {
    toast.success(response?.message || " HeadQuarter Added Successfuly !");
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
            + Add HeadQuater⛳️
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
                Add HeadQuater ⛳️ !
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4 justify-center items-center">
                  {/* <div className="grid lg:grid-cols-2 grid-cols-1  gap-4"> */}
                  <div className="flex flex-col justify-center ">
                    <Input
                      type="text"
                      label="HeadQuaterName"
                      name="HeadQuaterName"
                      value={formData.HeadQuaterName}
                      onChange={handleInputChange}
                      required
                      className="w-3/1"
                    />
                    {errors.HeadQuaterName && (
                      <p className="text-red-500  text-xs p-1">
                        {errors.HeadQuaterName}
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
                  {/* </div> */}
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
