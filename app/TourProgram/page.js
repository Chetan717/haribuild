import React from "react";
import Users from "./Comp/Users";

export default function Page() {
  return (
    <>
      <div className="flex flex-col mb-10 mt-10 gap-5 m-1 h-full justify-center items-center">
        <p className="text-xl font-bold ">All Employee Details !</p>
        <Users />
        
      </div>
    </>
  );
}
