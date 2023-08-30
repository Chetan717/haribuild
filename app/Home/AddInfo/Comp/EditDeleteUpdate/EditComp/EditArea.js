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
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";
export default function EditArea({ item }) {
  const Server = process.env.NEXT_PUBLIC_SERVER_NAME;
  const {fetchData} = useGlobalContext()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const [typSel, setTypSel] = React.useState("");
  const sizes = ["xl"];

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  const [formData, setFormData] = React.useState({
    AreaName: "",
    Type: "",
    Active: true,
  });

  React.useEffect(() => {
    // Destructure the properties from the 'item'
    const { AreaName, Type, Active } = item || {};

    // Update the 'formData' state with the values from 'item'
    setFormData({
      AreaName,
      Type,
      Active,
    });
    setTypSel(Type);
  }, [item]); // Dependency array with 'item'

  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};

    if (formData.AreaName.length <= 3) {
      newErrors.AreaName = "AreaName is required";
    }
    if (!formData.Type) {
      newErrors.Type = "Please Select Type";
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
      const apiUrl = `${Server}/add/area/${idparam}`;
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
        });
        fetchData()
    } else {
      toast.error("Please fill All Details");
    }
  };

 

  const handleDelete = (idparam) => {
    const apiUrl = `${Server}/add/area/${idparam}`;
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
        fetchData()
      });
  };

  const notifyd = () => {
    toast.success("Area Deleted");
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
            + Edit 🏴󠁰󠁫󠁴󠁡󠁿
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
                Edit Area!
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4 justify-center items-center">
                  <div className="grid lg:grid-cols-2 grid-cols-1  gap-4">
                    <div className="flex flex-col justify-center ">
                      <Input
                        type="text"
                        label="AreaName"
                        name="AreaName"
                        value={formData.AreaName}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.AreaName && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.AreaName}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-4 justify-center items-center ">
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
                  <>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          color="danger"
                          variant="solid"
                          className="capitalize"
                        >
                          Delete Area
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
