// "use client";
// import React from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import edit from "../../img/edit.webp";
// import del from "../../img/delete.webp";
// import Image from "next/image";
// import "react-toastify/dist/ReactToastify.css";
// import { Chip } from "@nextui-org/react";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
//   useDisclosure,
// } from "@nextui-org/react";
// import {
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
//   RadioGroup,
//   Radio,
// } from "@nextui-org/react";
// import { Input } from "@nextui-org/react";
// import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";

// export const CheckIcon = ({ size, height, width, ...props }) => {
//   return (
//     <svg
//       width={size || width || 24}
//       height={size || height || 24}
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       {...props}
//     >
//       <path
//         d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
//         fill="currentColor"
//       />
//     </svg>
//   );
// };

// export default function TpEdit({ item }) {
//   const Server = process.env.NEXT_PUBLIC_SERVER_NAME;
//   const { AreasOption } = useGlobalContext();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [size, setSize] = React.useState("md");
//   const sizes = ["5xl"];

//   const handleOpen = (size) => {
//     setSize(size);
//     onOpen();
//   };

//   const [formData, setFormData] = React.useState({
//     chemCode: "",
//     chemName: "",
//     contactPer: "",
//     mobile: "",
//     address: "",
//     Area: "",
//     DLNo: "",
//     GSTNo: "",
//   });

//   React.useEffect(() => {
//     // Destructure the properties from the 'item'
//     const {
//       chemCode,
//       chemName,
//       mobile,
//       address,
//       Area,
//       contactPer,
//       DLNo,
//       GSTNo,
//     } = item || {};

//     // Update the 'formData' state with the values from 'item'
//     setFormData({
//       chemCode,
//       chemName,
//       mobile,
//       address,
//       Area,
//       DLNo,
//       contactPer,
//       GSTNo,
//     });
//   }, [item]); // Dependency array with 'item'

//   const [errors, setErrors] = React.useState({});

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.chemCode) {
//       newErrors.chemCode = "Chemist Code is required";
//     }
//     if (!formData.chemName) {
//       newErrors.chemName = "Chemist Name is required";
//     }
//     if (!formData.contactPer) {
//       newErrors.contactPer = "Contact Name is required";
//     }
//     if (!formData.mobile) {
//       newErrors.mobile = "Mobile No. is required";
//     }
//     if (!formData.address) {
//       newErrors.address = "Address is required";
//     }
//     if (!formData.GSTNo) {
//       newErrors.GSTNo = "GST is required";
//     }
//     if (!formData.DLNo) {
//       newErrors.DLNo = "DL.No is required";
//     }

//     if (!formData.Area) {
//       newErrors.Area = "Area is required";
//     }

//     // Add similar validation for other fields

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const [isLoading, setIsLoading] = React.useState(false);
//   const [hasError, setHasError] = React.useState(false);
//   const [response, setResponse] = React.useState({});

//   const handleApproved = (idparam, status) => {
//     if (validateForm()) {
//       const apiUrl = `${Server}/add/chem/${idparam}`;
//       setIsLoading(true);
//       setHasError(false);

//       axios
//         .put(apiUrl, { approved: status })
//         .then((response) => {
//           const responseData = response.data;
//           setResponse(responseData);

//           toast.success(`${response?.data?.message}`);
//         })
//         .catch((error) => {
//           setHasError(true);
//           toast.error(error?.response?.data?.message);
//         })
//         .finally(() => {
//           setIsLoading(false);
//         });
//     } else {
//       toast.error("Please fill All Details");
//     }
//   };

//   const handleSubmit = (idparam) => {
//     if (validateForm()) {
//       const apiUrl = `${Server}/add/chem/${idparam}`;
//       setIsLoading(true);
//       setHasError(false);

//       axios
//         .put(apiUrl, formData)
//         .then((response) => {
//           const responseData = response.data;
//           setResponse(responseData);

//           toast.success(`${response?.data?.message}`);
//         })
//         .catch((error) => {
//           setHasError(true);
//           toast.error(error?.response?.data?.message);
//         })
//         .finally(() => {
//           setIsLoading(false);
//         });
//     } else {
//       toast.error("Please fill All Details");
//     }
//   };

//   const handleDelete = (idparam) => {
//     const apiUrl = `${Server}/add/chem/${idparam}`;
//     setIsLoading(true);
//     setHasError(false);

//     axios
//       .delete(apiUrl, formData)
//       .then((response) => {
//         const responseData = response.data;
//         setResponse(responseData);

//         toast.success(`${response?.data?.message}`);
//       })
//       .catch((error) => {
//         setHasError(true);
//         toast.error(error?.response?.data?.message);
//       })
//       .finally(() => {
//         setIsLoading(false);
//         setTimeout(() => {
//           window.location.reload();
//         }, 1000);
//       });
//   };

//   return (
//     <>
//       <ToastContainer
//         position="bottom-center"
//         autoClose={1000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//       />
//       <div className="flex flex-wrap gap-3">
//         {sizes.map((size) => (
//           <div
//             key={size}
//             className="flex flex-row gap-3 justify-center items-center"
//           >
//             <Image
//               onClick={() => handleOpen(size)}
//               className="cursor-pointer"
//               src={edit}
//               width={20}
//               height={20}
//               alt="icons"
//             />

//             <Dropdown>
//               <DropdownTrigger>
//                 <Image
//                   className="cursor-pointer"
//                   src={del}
//                   width={20}
//                   height={20}
//                   alt="icons"
//                 />
//               </DropdownTrigger>
//               <DropdownMenu
//                 aria-label="Dropdown Variants"
//                 color="default"
//                 variant="solid"
//               >
//                 <DropdownItem
//                   key="delete"
//                   className="text-danger"
//                   color="danger"
//                   onClick={() => handleDelete(item._id)}
//                 >
//                   Confirm Delete
//                 </DropdownItem>
//               </DropdownMenu>
//             </Dropdown>

//             <Dropdown>
//               <DropdownTrigger>
//                 {item?.approved === true ? (
//                   <Chip
//                     startContent={<CheckIcon size={18} />}
//                     variant="faded"
//                     color="success"
//                   >
//                     Approved
//                   </Chip>
//                 ) : (
//                   <Chip color="warning" variant="dot">
//                     UnApproved
//                   </Chip>
//                 )}
//               </DropdownTrigger>
//               <DropdownMenu
//                 aria-label="Dropdown Variants"
//                 color="default"
//                 variant="solid"
//               >
//                 <DropdownItem
//                   key="delete"
//                   className="text-danger"
//                   color="default"
//                 >
//                   <div className="flex flex-row gap-3 ">
//                     <p
//                       onClick={() => handleApproved(item._id, true)}
//                       className="bg-black text-xs rounded-lg text-white p-1.5"
//                     >
//                       Appoved
//                     </p>
//                     <p
//                       onClick={() => handleApproved(item._id, false)}
//                       className="bg-black text-xs rounded-lg text-white p-1.5 "
//                     >
//                       UnAppoved
//                     </p>
//                   </div>
//                 </DropdownItem>
//               </DropdownMenu>
//             </Dropdown>
//           </div>
//         ))}
//       </div>
//       <Modal
//         size={size}
//         isOpen={isOpen}
//         scrollBehavior={`inside`}
//         onClose={onClose}
//       >
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">
//                 Edit Chemist 💊
//               </ModalHeader>
//               <ModalBody>
//                 <form className="flex flex-col gap-4 justify-center items-center">
//                   <div className="grid lg:grid-cols-2 grid-cols-1  gap-4">
//                     <div className="flex flex-col justify-center ">
//                       <Input
//                         type="text"
//                         label="Chem Code"
//                         name="chemCode"
//                         value={formData.chemCode}
//                         onChange={handleInputChange}
//                         required
//                       />
//                       {errors.chemCode && (
//                         <p className="text-red-500  text-xs p-1">
//                           {errors.chemCode}
//                         </p>
//                       )}
//                     </div>

//                     <div className="flex flex-col justify-center ">
//                       <Input
//                         type="text"
//                         label="chemist Name"
//                         name="chemName"
//                         value={formData.chemName}
//                         onChange={handleInputChange}
//                         required
//                       />
//                       {errors.chemName && (
//                         <p className="text-red-500  text-xs p-1">
//                           {errors.chemName}
//                         </p>
//                       )}
//                     </div>
//                     <div className="flex flex-col justify-center ">
//                       <Input
//                         type="text"
//                         label="Contact Person "
//                         name="contactPer"
//                         value={formData.contactPer}
//                         onChange={handleInputChange}
//                         required
//                       />
//                       {errors.contactPer && (
//                         <p className="text-red-500  text-xs p-1">
//                           {errors.contactPer}
//                         </p>
//                       )}
//                     </div>
//                     <div className="flex flex-col justify-center ">
//                       <Input
//                         type="tel"
//                         label="Mobile"
//                         name="mobile"
//                         value={formData.mobile}
//                         onChange={handleInputChange}
//                         required
//                       />
//                       {errors.mobile && (
//                         <p className="text-red-500  text-xs p-1">
//                           {errors.mobile}
//                         </p>
//                       )}
//                     </div>
//                     <div className="flex flex-col justify-center ">
//                       <p className="text-sm p-1 text-gray-600">Select Area</p>
//                       <select
//                         className="outline-none font-semibold text-gray-600 border-1 bg-transparent text-small w-[300px] h-[50px] rounded-lg bg-gray-200 p-2"
//                         id="Area"
//                         name="Area"
//                         value={formData.Area}
//                         onChange={handleInputChange}
//                         required
//                       >
//                         <option value="">Select Area</option>
//                         {AreasOption.map((i) => {
//                           return (
//                             <>
//                               <option value={i}>{i}</option>
//                             </>
//                           );
//                         })}
//                       </select>
//                       {errors.Area && (
//                         <p className="text-red-500  text-xs p-1">
//                           {errors.Area}
//                         </p>
//                       )}
//                     </div>
//                     <div className="flex flex-col justify-center ">
//                       <Input
//                         type="number"
//                         label="GSTNO..."
//                         name="GSTNo"
//                         value={formData.GSTNo}
//                         onChange={handleInputChange}
//                       />
//                       {errors.GSTNo && (
//                         <p className="text-red-500  text-xs p-1">
//                           {errors.GSTNo}
//                         </p>
//                       )}
//                     </div>

//                     <div className="flex flex-col justify-center ">
//                       <Input
//                         type="number"
//                         label="DLNO..."
//                         name="DLNo"
//                         value={formData.DLNo}
//                         onChange={handleInputChange}
//                       />{" "}
//                       {errors.DLNo && (
//                         <p className="text-red-500  text-xs p-1">
//                           {errors.DLNo}
//                         </p>
//                       )}
//                     </div>

//                     <div className="flex flex-col justify-center ">
//                       <Input
//                         type="textarea"
//                         label="Address"
//                         name="address"
//                         value={formData.address}
//                         onChange={handleInputChange}
//                         required
//                       />
//                       {errors.address && (
//                         <p className="text-red-500  text-xs p-1">
//                           {errors.address}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </form>
//               </ModalBody>
//               <ModalFooter>
//                 <Button color="danger" variant="light" onClick={onClose}>
//                   Close
//                 </Button>
//                 {isLoading ? (
//                   <Button
//                     isLoading
//                     className="bg-black text-white"
//                     spinner={
//                       <svg
//                         className="animate-spin h-5 w-5 text-current"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         />
//                         <path
//                           className="opacity-75"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           fill="currentColor"
//                         />
//                       </svg>
//                     }
//                   >
//                     Wait..
//                   </Button>
//                 ) : (
//                   <>
//                     <Button
//                       color="black"
//                       className="bg-black text-white"
//                       onClick={() => handleSubmit(item._id)}
//                     >
//                       Update
//                     </Button>
//                   </>
//                 )}
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }

"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import edit from "../../../img/edit.webp";
import del from "../../../img/delete.webp";
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
import ListByDate from "@/app/CreateTourProgram/Comp/ListByDate";
import TourDateList from "@/app/CreateTourProgram/Comp/TourDateList";

export default function EditTour({ dcr }) {
  const { allArea } = useGlobalContext();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const sizes = ["5xl"];

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
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
          <div className="flex flex-row gap-5" key={size}>
            <Image
              onClick={() => handleOpen(size)}
              width={20}
              height={20}
              className="cursor-pointer"
              alt="icon"
              src={edit}
            />
            <Image
              width={20}
              height={20}
              className="cursor-pointer"
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
                Edit Tour Program
              </ModalHeader>
              <ModalBody>
                <TourDateList dcr={dcr} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
