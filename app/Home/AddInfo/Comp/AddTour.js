"use client";
import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import shop from "../../../../public/tour.webp";
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
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";

import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";
export default function AddTour() {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const sizes = ["5xl"];
  const { AreasOption, headquaters, user, allEmpData } = useGlobalContext();
  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  const [formData, setFormData] = React.useState({
    startDate: "",
    lastDate: "",
    post: "",
    area: [],
    month: "",
    DcrId: "",
    createdBy: "",
    createdByName: "",
    SendToApproved: false,
    createdAt: new Date().toISOString().slice(0, 10),
    Act: true,
    Apv: false,
  });

  const EmpData = allEmpData?.userData;

  const DataofEmp = EmpData?.filter(
    (i) => i.empName === formData.createdByName
  );
  const EmpDataSel = DataofEmp ? DataofEmp[0] : {};
  formData.createdBy = EmpDataSel?.userId;
  formData.area = EmpDataSel?.selectedAreas;
  formData.post = EmpDataSel?.post;
  formData.DcrId = Date.now();
  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};

    // Add similar validation for other fields
    if (!formData.startDate) {
      newErrors.startDate = "startDate is required";
    }
    if (!formData.lastDate) {
      newErrors.lastDate = "lastDate is required";
    }
    if (!formData.month) {
      newErrors.month = "Month is required";
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

  const handleSubmit = (formData) => {
    const Server = process.env.NEXT_PUBLIC_SERVER_NAME;

    if (validateForm()) {
      const apiUrl = `${Server}/add/tour`;
      setIsLoading(true);
      setHasError(false);

      axios
        .post(apiUrl, formData)
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
          setFormData({
            startDate: "",
            lastDate: "",
            area: "",
            DcrId: "",
          });
          router.push(`/CreateTourProgram`);
          onClose();
        });
    } else {
      toast.error("Please fill All Details");
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
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
          <div
            key={size}
            onClick={() => handleOpen(size)}
            className="flex flex-row gap-1 bg-gray-100 p-2 rounded-lg justify-center items-center"
          >
            <Image
              width={20}
              height={20}
              alt="icon"
              src={shop}
              className=" cursor-pointer "
            />
            <p
              key={size}
              size="xs"
              className=" text-[12px] cursor-pointer  "
              onClick={() => handleOpen(size)}
            >
              + Create_Tour_Program
            </p>
          </div>
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
                Add Monthly Tour Program
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4 justify-center items-center">
                  <div className="grid lg:grid-cols-2 grid-cols-1  gap-4">
                    <div className="flex flex-col justify-center">
                      <p className="text-sm p-1 font-bold">Select User</p>
                      <select
                        className="outline-none font-semibold text-gray-600 bg-transparent text-small w-[300px] h-[50px] rounded-lg border-1 bg-gray-200 p-2"
                        id="createdByName"
                        name="createdByName"
                        value={formData.createdByName}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select User</option>

                        {EmpData?.map((i) => {
                          return (
                            <>
                              <option value={i.empName}>{i.empName}</option>
                            </>
                          );
                        })}
                      </select>

                      {errors.month && (
                        <p className="text-red-500 text-xs p-1">
                          {errors.month}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-center flex-col">
                      <label className="text-sm p-1"> Start Date</label>
                      <Input
                        type="date"
                        label=""
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex justify-center flex-col">
                      <label className="text-sm p-1"> Last Date</label>
                      <Input
                        type="date"
                        label=""
                        name="lastDate"
                        value={formData.lastDate}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="flex flex-col justify-center">
                      <p className="text-sm p-1 font-bold">Select Months</p>
                      <select
                        className="outline-none font-semibold text-gray-600 bg-transparent text-small w-[300px] h-[50px] rounded-lg border-1 bg-gray-200 p-2"
                        id="month"
                        name="month"
                        value={formData.month}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Months</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                      </select>

                      {errors.month && (
                        <p className="text-red-500 text-xs p-1">
                          {errors.month}
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
                    onClick={() => handleSubmit(formData)}
                  >
                    Create
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
