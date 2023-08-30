"use client";
import React from "react";
import { Tabs, Tab, Card, CardBody, ScrollShadow } from "@nextui-org/react";
import Emp from "./Comp/Emp";
import Chem from "./Comp/Chem";
import Doc from "./Comp/Doc";
import ListOfDoc from "./Comp/Doc";
import ListOfArea from "./Comp/Area";
import ListOfHeadQ from "./Comp/HeadQ";
import ListOfFare from "./Comp/Fare";
import ListOfProdRate from "./Comp/ProRate";
import ListOfStock from "./Comp/Stockiest";
import AddChemist from "../Home/AddInfo/Comp/AddChemModal";
import AddEmpModal from "../Home/AddInfo/Comp/AddEmpModal";
import AddDoctorModal from "../Home/AddInfo/Comp/AddDoctorModal";
import AddStockiest from "../Home/AddInfo/Comp/AddStockiest";
import AddArea from "../Home/AddInfo/Comp/AddArea";
import AddHeadQ from "../Home/AddInfo/Comp/AddHeadQ";
import AddStdFarChart from "../Home/AddInfo/Comp/AddStdFarChart";
import AddProduct from "../Home/AddInfo/Comp/AddProduct";

export default function MainTab() {
  return (
    <>
    
        <div className="flex  justify-center items-center mb-5  mt-5 flex-col">
          <Tabs
            className="flex flex-col justify-center items-center"
            color="primary"
            size="sm"
            aria-label="Options"
          >
            <Tab key="Employee Details" title="Employee Details">
              <Card>
                <CardBody className="flex flex-col gap-5 justify-center items-center">
                  <AddEmpModal />
                  <Emp />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="Chemist Details" title="Chemist Details">
              <Card>
                <CardBody className="flex flex-col gap-5 justify-center items-center">
                  <AddChemist />
                  <Chem />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="Doctor Details" title="Doctor Details">
              <Card>
                <CardBody className="flex flex-col gap-5 justify-center items-center">
                  <AddDoctorModal />
                  <ListOfDoc />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="Stockiest Details" title="Stockiest Details">
              <Card>
                <CardBody className="flex flex-col gap-5 justify-center items-center">
                  <AddStockiest />
                  <ListOfStock />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="Area Details" title="Area Details">
              <Card>
                <CardBody className="flex flex-col gap-5 justify-center items-center">
                  <AddArea />
                  <ListOfArea />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="HeadQuater Details" title="HeadQuater Details">
              <Card>
                <CardBody className="flex flex-col gap-5 justify-center items-center">
                  <AddHeadQ />
                  <ListOfHeadQ />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="FareChart Details" title="FareChart Details">
              <Card>
                <CardBody className="flex flex-col gap-5 justify-center items-center">
                  <AddStdFarChart />
                  <ListOfFare />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="Product & Rate Details" title="Product & Rate Details">
              <Card>
                <CardBody className="flex flex-col gap-5 justify-center items-center">
                  <AddProduct />
                  <ListOfProdRate />
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
    
    </>
  );
}
