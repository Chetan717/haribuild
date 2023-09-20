import { Button } from "@nextui-org/react";
import React from "react";

export default function Filters({ month, setMonth, status, setStatus }) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const statuslist = ["Approved", "UnApproved", "Active", "Expired"];
  return (
    <>
      <div className="flex flex-row justify-center items-center gap-5 ">
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-2 cursor-pointer text-sm rounded-lg shadow-lg "
          placeholder="Select Month"
        >
          <option value="">Select Month</option>
          {months.map((i) => {
            return (
              <>
                <option value={i}>{i}</option>
              </>
            );
          })}
        </select>
        <div className="flex flex-row gap-3 p-2">
          {statuslist.map((i) => {
            return (
              <>
                <p
                  className={
                    status === i
                      ? `bg-black cursor-cell p-2 text-sm font-bold text-white rounded-lg`
                      : `bg-gray-200 cursor-cell p-2 text-sm font-bold text-black rounded-lg`
                  }
                  onClick={() => setStatus(i)}
                >
                  {i}
                </p>
              </>
            );
          })}
        </div>
        <Button
          onClick={() => setStatus("")}
          size="sm"
          className="bg-black text-white "
        >
          Clear Filter
        </Button>
        {/* <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 rounded-lg shadow-lg "
          placeholder="Select Month"
        >
          <option value="">Select Status</option>
        </select> */}
      </div>
    </>
  );
}
