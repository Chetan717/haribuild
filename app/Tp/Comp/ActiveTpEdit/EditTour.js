"use client";
import React from "react";

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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
} from "@nextui-org/react";

import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";

import TourDateList from "@/app/CreateTourProgram/Comp/TourDateList";

export default function EditTour({ dcr, HandleDelete }) {
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

            <Dropdown>
              <DropdownTrigger>
                <Image
                  width={20}
                  height={20}
                  className="cursor-pointer"
                  alt="icon"
                  src={del}
                />
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
                  onClick={() => HandleDelete(dcr?._id)}
                >
                  Confirm Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
