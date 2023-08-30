import React from "react";
import ListOfEmp from "./ListOfEmp";
// import AddUserForm from "../FormsInApp/AddUserForm";
import DashInfo from "./DashInfo";
import AddInfo from "./AddInfo/AddInfo";
// import MainTab from "./Tabs/MainTab";

export default function MainHome() {
  const Option = ["BD-Executive", "Area", "Headquarter", "Doctor"];

  return (
    <>
      <div className="flex flex-col  w-full border border- justify-center items-center  ">
        <div>
          <h1 className="font-bold text-xl mt-10 text-gray-600">
            Welcome to Avirosa Pharmachem Pvt.Ltd !
          </h1>
        </div>
        {/* <DashInfo /> */}
      </div>
    </>
  );
}
