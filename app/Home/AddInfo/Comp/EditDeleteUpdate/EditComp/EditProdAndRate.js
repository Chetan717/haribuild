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
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";

import InputList from "../../EmerncyAdject/InputList";
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";
export default function EditProdRate({ item,RefetchData,DataFetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const Server = process.env.NEXT_PUBLIC_SERVER_NAME;
  const { fetchData } = useGlobalContext();
  const sizes = ["4xl"];

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };
  const [inputList, setInputList] = React.useState([
    { id: 1, MainPro: "", FreeProduct: "" }, // Initial input item
  ]);

  const [formData, setFormData] = React.useState({
    ProductName: "",
    Packing: "",
    MRP: "",
    PTR: "",
    PTS: "",
    scheme: [],
    Active: true,
  });
  formData.scheme = inputList;

  React.useEffect(() => {
    // Destructure the properties from the 'item'
    const { ProductName, Packing, MRP, PTR, PTS, scheme, Active } = item || {};

    // Update the 'formData' state with the values from 'item'
    setFormData({
      ProductName,
      Packing,
      MRP,
      PTR,
      PTS,
      scheme,
      Active,
    });

    setInputList(scheme);
  }, [item]);

  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};

    if (formData.ProductName.length <= 3) {
      newErrors.ProductName = "ProductName is required";
    }
    if (formData.Packing.length <= 3) {
      newErrors.Packing = "Packing is required";
    }
    if (!formData.MRP) {
      newErrors.MRP = " MRP is Required !";
    }
    if (!formData.PTR) {
      newErrors.PTR = " PTR is Required !";
    }
    if (!formData.PTS) {
      newErrors.PTS = " PTS is Required !";
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

  const handleSubmit = (idparam) => {
    if (validateForm()) {
      const apiUrl = `${Server}/add/proRate/${idparam}`;
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
          RefetchData(DataFetch);
        });
    } else {
      toast.error("Please fill All Details");
    }
  };

 

  const handleDelete = (idparam) => {
    const apiUrl = `${Server}/add/proRate/${idparam}`;
    setIsLoading(true);
    setHasError(false);

    axios
      .delete(apiUrl, formData)
      .then((response) => {
        const responseData = response.data;
        setResponse(responseData);

        if (response.status === 200) {
          // Perform any necessary actions on success
          notifyd();
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
        notifyd();
        RefetchData(DataFetch);
      });
  };

 
  const Types = ["HQ", "EX", "OS"];
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
            size="sm"
            className="text-black font-bold "
            onPress={() => handleOpen(size)}
          >
            + Edit 🧴
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
                Edit 🧴 !
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4 justify-center items-center">
                  <div className="grid lg:grid-cols-2 grid-cols-1  gap-4">
                    <div className="flex flex-col justify-center ">
                      <Input
                        type="text"
                        label="ProductName"
                        name="ProductName"
                        value={formData.ProductName}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.ProductName && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.ProductName}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col justify-center ">
                      <Input
                        type="text"
                        label="Packing"
                        name="Packing"
                        value={formData.Packing}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.Packing && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.Packing}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col justify-center ">
                      <Input
                        type="number"
                        label="MRP"
                        name="MRP"
                        value={formData.MRP}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.MRP && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.MRP}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col justify-center ">
                      <Input
                        type="number"
                        label="PTR"
                        name="PTR"
                        value={formData.PTR}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.PTR && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.PTR}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col justify-center ">
                      <Input
                        type="number"
                        label="PTS"
                        name="PTS"
                        value={formData.PTS}
                        onChange={handleInputChange}
                        maxLength={4}
                        required
                      />
                      {errors.PTS && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.PTS}
                        </p>
                      )}
                    </div>
                  </div>
                  <InputList
                    inputList={inputList}
                    setInputList={setInputList}
                  />
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
                  <>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          color="danger"
                          variant="solid"
                          className="capitalize"
                        >
                          Delete Product & Rate
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
                          color="danger"
                          onClick={() => handleDelete(item._id)}
                        >
                          Confirm Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>

                    <Button
                      color="black"
                      className="bg-black text-white"
                      onClick={() => handleSubmit(item._id)}
                    >
                      Save
                    </Button>
                  </>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
