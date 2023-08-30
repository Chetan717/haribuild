import React from "react";
import CraeteTour from "./Comp/CreateTour";
import ListByDate from "./Comp/ListByDate";
import AddTour from "../Home/AddInfo/Comp/AddTour";
import MainTp from "../Tp/Comp/MainTp";

export default function page() {
  return (
    <>
      <div className="flex flex-col justify-center items-center  gap-5">
        <AddTour />
        {/* <ListByDate /> */}
        <MainTp />
      </div>
    </>
  );
}
