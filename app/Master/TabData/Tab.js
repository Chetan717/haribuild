"use client";
import FilterByArea from "@/app/FilterComp/FilterByArea";
import AddArea from "@/app/Home/AddInfo/Comp/AddArea";
import AddChemist from "@/app/Home/AddInfo/Comp/AddChemModal";
import AddDoctorModal from "@/app/Home/AddInfo/Comp/AddDoctorModal";
import AddEmpModal from "@/app/Home/AddInfo/Comp/AddEmpModal";
import AddHeadQ from "@/app/Home/AddInfo/Comp/AddHeadQ";
import AddProduct from "@/app/Home/AddInfo/Comp/AddProduct";
import AddStdFarChart from "@/app/Home/AddInfo/Comp/AddStdFarChart";
import AddStockiest from "@/app/Home/AddInfo/Comp/AddStockiest";
import ListOfEmp from "@/app/Home/ListOfEmp";

import DataQueryLimitor from "@/app/SerachComp/DataQueryLimitor";
import SerchBox from "@/app/SerachComp/SerchBox";
import ListOfArea from "@/app/Tabs/Comp/Area";
import ListOfChem from "@/app/Tabs/Comp/Chem";
import ListOfDoc from "@/app/Tabs/Comp/Doc";
import Emp from "@/app/Tabs/Comp/Emp";
import ListOfFare from "@/app/Tabs/Comp/Fare";
import ListOfHeadQ from "@/app/Tabs/Comp/HeadQ";
import ListOfProdRate from "@/app/Tabs/Comp/ProRate";
import ListOfStock from "@/app/Tabs/Comp/Stockiest";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";

export default function Tab() {
  const [selTab, setSelTab] = useState("Employee");

  const Tabs = [
    "Employee",
    "Doctor",
    "Chemist",
    "Stockiest",
    "Area",
    "Headquaters",
    "Product&Rate",
    "FareChart",
  ];
  const TabAct =
    typeof localStorage !== "undefined" ? localStorage?.getItem("tab") : null;
  const Active = JSON.parse(TabAct);

  const [dataLimit, setDataLimit] = useState({
    first: "",
    last: "",
  });
  const [limitData, setLimitData] = useState({
    first: "",
    last: "",
  });

  const [value, setValue] = React.useState("");
  const [valueAp, setValueAp] = React.useState(true);

  const HandleDataLimitor = (e) => {
    const { name, value } = e.target;
    setDataLimit((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const GetDataUsingLimitor = (dataLimit) => {
    setLimitData(dataLimit);
  };

  const [search, setSearch] = useState("");
  const setTabActive = (i) => {
    localStorage?.setItem("tab", JSON.stringify(i));
    setSelTab(i);
    ClearAllFilter();
  };
  const ClearAllFilter = () => {
    setDataLimit({
      first: "",
      last: "",
    });
    setLimitData({
      first: "",
      last: "",
    });
    setValue("");
    setSearch("");
  };

  const HandleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col judtify-center items-center gap-3">
        <div className="flex flex-row gap-4 justify-center items-center bg-gray-100 p-3 rounded-lg">
          {Tabs.map((i) => {
            return (
              <>
                <p
                  key={i}
                  onClick={() => setTabActive(i)}
                  className={
                    Active === i
                      ? `font-bold rounded-lg text-xs cursor-pointer bg-black text-white p-2`
                      : `font-bold text-sm rounded-lg cursor-pointer  text-gray-700 p-2`
                  }
                >
                  {i}
                </p>
              </>
            );
          })}
        </div>

        {Active === "Doctor" ||
          Active === "Chemist" ||
          Active === "Stockiest" ? (
          <div className="flex bg-white rounded-lg flex-row gap-6 p-2 justify-center items-center">
            <Button
              onClick={ClearAllFilter}
              size="md"
              className="text-white bg-blue-500"
            >
              Clear Filter
            </Button>
            <SerchBox HandleSearchChange={HandleSearchChange} search={search} />
            <DataQueryLimitor
              dataLimit={dataLimit}
              HandleDataLimitor={HandleDataLimitor}
              GetDataUsingLimitor={GetDataUsingLimitor}
            />
            {Active === "Stockiest" ? null : (
              <FilterByArea
                value={value}
                setValue={setValue}
                valueAp={valueAp}
                setValueAp={setValueAp}
              />
            )}
          </div>
        ) : null}
        <div className="flex flex-col justify-center items-center">
          {Active === "Employee" ? (
            <div className="flex flex-col gap-5 justify-center items-center">
              {/* <AddEmpModal /> */}
              <ListOfEmp />
            </div>
          ) : Active === "Doctor" ? (
            <div className="flex flex-col gap-5 justify-center items-center">
              {/* <AddDoctorModal /> */}
              <ListOfDoc
                limitData={limitData}
                setLimitData={setLimitData}
                AreaValue={value}
                search={search}
                Active={Active}
                valueAp={valueAp}
              />
            </div>
          ) : Active === "Area" ? (
            <div className="flex flex-col gap-5 justify-center items-center">
              {/* <AddArea /> */}
              <ListOfArea />
            </div>
          ) : Active === "Headquaters" ? (
            <div className="flex flex-col gap-5 justify-center items-center">
              {/* <AddHeadQ /> */}
              <ListOfHeadQ />
            </div>
          ) : Active === "Product&Rate" ? (
            <div className="flex flex-col gap-5 justify-center items-center">
              {/* <AddProduct /> */}
              <ListOfProdRate />
            </div>
          ) : Active === "FareChart" ? (
            <div className="flex flex-col gap-5 justify-center items-center">
              {/* <AddStdFarChart /> */}
              <ListOfFare />
            </div>
          ) : Active === "Chemist" ? (
            <div className="flex flex-col gap-5 justify-center items-center">
              {/* <AddChemist /> */}
              <ListOfChem
                limitData={limitData}
                setLimitData={setLimitData}
                AreaValue={value}
                search={search}
                Active={Active}
                valueAp={valueAp}
              />
            </div>
          ) : Active === "Stockiest" ? (
            <div className="flex flex-col gap-5 justify-center items-center">
              {/* <AddStockiest /> */}
              <ListOfStock
                limitData={limitData}
                setLimitData={setLimitData}
                AreaValue={value}
                search={search}
                Active={Active}
                valueAp={valueAp}
              />
            </div>
          ) : (
            <p>no data</p>
          )}
        </div>
      </div>
    </>
  );
}
