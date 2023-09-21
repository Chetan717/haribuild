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
import { CheckboxGroup } from "@nextui-org/react";
import { CustomCheckbox } from "./styleComp/CustomCheckbox";
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";
export default function AddEmpModal({ RefetchData, DataFetch }) {
  const { headquaters, AreasOption } = useGlobalContext();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const sizes = ["full"];

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };
  const [groupSelected, setGroupSelected] = React.useState([]);

  const [formData, setFormData] = React.useState({
    Code: "",
    empName: "",
    userId: "",
    pass: "",
    mobile1: "",
    Secmob: "",
    address: "",
    email: "",
    post: "",
    headquarters: "",
    panNo: "",
    adharNo: "",
    bankAccountNo: "",
    ifscCode: "",
    dob: "",
    joiningDate: "",
    anniversaryDate: "",
    resignationDate: "",
    selectedAreas: [],
    pvrRemark: "",
    online: false,
    Active: true,
    Banned: false,
  });

  formData.selectedAreas = groupSelected;

  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.Code) {
      newErrors.Code = "Emp Code is required";
    }
    if (!formData.empName) {
      newErrors.empName = "Emp Name is required";
    }
    if (!formData.userId) {
      newErrors.userId = "userId is required";
    }

    const MIN_LENGTH = 8;
    if (formData.pass.length !== MIN_LENGTH) {
      newErrors.pass = "password is required";
    }
    const numericRegex = /^\d+$/;
    if (!numericRegex.test(formData.mobile1) || formData.mobile1.length < 10) {
      newErrors.mobile1 = "Mobile no is not valid";
    }
    if (!numericRegex.test(formData.Secmob) || formData.Secmob.length < 10) {
      newErrors.Secmob = "Mobile no is not valid";
    }
    if (!formData.address) {
      newErrors.address = "Address is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }
    if (!formData.post) {
      newErrors.post = "Post is required";
    }
    if (!formData.headquarters) {
      newErrors.headquarters = "Headquarters is required";
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
  const handleSubmit = () => {
    if (validateForm()) {
      const apiUrl = `${Server}/user/signup`;
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
            Code: "",
            empName: "",
            userId: "",
            pass: "",
            mobile1: "",
            Secmob: "",
            address: "",
            email: "",
            post: "",
            headquarters: "",
            panNo: "",
            adharNo: "",
            bankAccountNo: "",
            ifscCode: "",
            dob: "",
            joiningDate: "",
            anniversaryDate: "",
            resignationDate: "",
            selectedAreas: [],
            pvrRemark: "",
          });
          RefetchData(DataFetch);
        });

    } else {
      toast.error("Please fill All Details");
    }
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
            + Add Employees 🤵
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
                Add Employees🧑‍💼!
              </ModalHeader>
              <ModalBody>
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
                <form className="flex flex-col gap-4 justify-center items-center">
                  <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                    <div className="flex flex-col gap-1">
                      <Input
                        type="text"
                        label="Emp Code"
                        name="Code"
                        value={formData.Code}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.Code && (
                        <p className="text-red-500 text-xs font-semibold p-1">
                          {errors.Code}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Input
                        type="text"
                        label="User Id"
                        name="userId"
                        value={formData.userId}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.userId && (
                        <p className="text-red-500 text-xs font-semibold p-1">
                          {errors.userId}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Input
                        type="text"
                        label="Emp Name"
                        name="empName"
                        value={formData.empName}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.empName && (
                        <p className="text-red-500 text-xs font-semibold p-1">
                          {errors.empName}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Input
                        type="tel"
                        label="Mobile-1"
                        name="mobile1"
                        value={formData.mobile1}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.mobile1 && (
                        <p className="text-red-500 text-xs font-semibold p-1">
                          {errors.mobile1}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Input
                        type="tel"
                        label="Optional mobile "
                        name="Secmob"
                        value={formData.Secmob}
                        onChange={handleInputChange}
                      />
                      {errors.Secmob && (
                        <p className="text-red-500 text-xs font-semibold p-1">
                          {errors.Secmob}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Input
                        type="text"
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs font-semibold p-1">
                          {errors.address}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Input
                        type="email"
                        label="Email-Id"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs font-semibold p-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Input
                        type="text"
                        label="Password.."
                        name="pass"
                        value={formData.pass}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.pass && (
                        <p className="text-red-500 text-xs font-semibold p-1">
                          {errors.pass}
                        </p>
                      )}
                    </div>
                    <div>
                      <select
                        className="outline-none font-semibold text-gray-600 border-1 bg-transparent text-small w-[300px] h-[50px] rounded-lg bg-gray-200 p-2"
                        id="post"
                        name="post"
                        value={formData.post}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Post</option>
                        <option value="Sale manager">Sale manager</option>
                        <option value="Buisness Devlopment Executive">
                          Business Devlopment Executive
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
                        <option value="Territory sales executive">
                          Territory sales executive
                        </option>
                      </select>
                      {errors.post && (
                        <p className="text-red-500 text-xs font-semibold p-1">
                          {errors.post}
                        </p>
                      )}
                    </div>
                    <div>
                      <select
                        className="outline-none font-semibold text-gray-600 border-1 bg-transparent text-small w-[300px] h-[50px] rounded-lg bg-gray-200 p-2"
                        id="headquarters"
                        name="headquarters"
                        value={formData.headquarters}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Headquarters</option>
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
                      {errors.headquarters && (
                        <p className="text-red-500 text-xs font-semibold p-1">
                          {errors.headquarters}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Input
                        type="text"
                        label="PAN No."
                        name="panNo"
                        value={formData.panNo}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.panNo && (
                        <p className="text-red-500 text-xs font-semibold p-1">
                          {errors.panNo}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Input
                        type="text"
                        label="Aadhar No."
                        name="adharNo"
                        value={formData.adharNo}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.adharNo && (
                        <p className="text-red-500 text-xs font-semibold p-1">
                          {errors.adharNo}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <Input
                        type="text"
                        label="Bank Account No."
                        name="bankAccountNo"
                        value={formData.bankAccountNo}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.bankAccountNo && (
                        <p className="text-red-500 text-xs font-semibold p-1">
                          {errors.bankAccountNo}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Input
                        type="text"
                        label="IFSC Code"
                        name="ifscCode"
                        value={formData.ifscCode}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.ifscCode && (
                        <p className="text-red-500 text-xs font-semibold p-1">
                          {errors.ifscCode}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-center flex-col">
                      <label className="text-sm p-1">Date Of Birth</label>
                      <Input
                        type="date"
                        label=""
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="flex justify-center flex-col">
                      <label className="text-sm p-1">Joining Date</label>
                      <Input
                        type="date"
                        label=""
                        name="joiningDate"
                        value={formData.joiningDate}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="flex justify-center flex-col">
                      <label className="text-sm p-1">Anniversary Date</label>
                      <Input
                        type="date"
                        label=""
                        name="anniversaryDate"
                        value={formData.anniversaryDate}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="flex justify-center flex-col">
                      <label className="text-sm p-1">Resignation Date</label>
                      <Input
                        type="date"
                        label=""
                        name="resignationDate"
                        value={formData.resignationDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="text-sm p-1">PVR Remark</label>
                      <Input
                        type="text"
                        rows={4}
                        label="Remark...."
                        name="pvrRemark"
                        value={formData.pvrRemark}
                        onChange={handleInputChange}
                      />
                      {errors.pvrRemark && (
                        <p className="text-red-500 text-xs font-semibold p-1">
                          {errors.pvrRemark}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 mt-4">
                    <div className="flex flex-col  gap-4 w-full">
                      <CheckboxGroup
                        className="gap-1 flex text-black font-bold  flex-wrap"
                        label="Select Areas"
                        orientation="horizontal"
                        value={groupSelected}
                        onChange={setGroupSelected}
                      >
                        {AreasOption?.map((i) => {
                          return (
                            <>
                              <CustomCheckbox className="text-sm" value={i}>
                                {i}
                              </CustomCheckbox>
                            </>
                          );
                        })}
                      </CheckboxGroup>
                      {errors.selectedAreas && (
                        <p className="text-red-500 text-xs font-semibold p-1">
                          {errors.selectedAreas}
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
