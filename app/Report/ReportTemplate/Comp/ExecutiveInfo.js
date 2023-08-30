import React from "react";
import moment from "moment";
moment().format();

export default function ExecutiveInfo({ AllDocByDate }) {
  const userId = JSON.parse(localStorage?.getItem("user")) || "admin";
  console.log(AllDocByDate, "dc");

  // const { area, DcrId, createdAt, workWith } = AllDocByDate[0] || AllDocByDate;

  const { empName, headquarters, mobile1, post, selectedAreas } = userId;

  return (
    <>
      <table class="border  border-black text-center ">
        <thead>
          <tr>
            <th class="border border-black text-center text-[10px] font-bold text-gray-800 p-0.5">
              Name
            </th>
            <th class="border border-black text-center text-[10px] font-bold text-gray-800 p-0.5">
              Date
            </th>
            <th class="border border-black text-center text-[10px] font-bold text-gray-800 p-0.5">
              Designation
            </th>
            <th class="border border-black text-center text-[10px] font-bold text-gray-800 p-0.5">
              Headquarters
            </th>
            <th class="border border-black text-center text-[10px] font-bold text-gray-800 p-0.5">
              Actual_TP
            </th>
            <th class="border border-black text-center text-[10px] font-bold text-gray-800 p-0.5">
              Work_With
            </th>
            <th class="border border-black text-center text-[10px] font-bold text-gray-800 p-0.5">
              DCR_ID
            </th>
            <th class="border border-black text-center text-[10px] font-bold text-gray-800 p-0.5">
              Work_at
            </th>
            <th class="border border-black text-center text-[10px] font-bold text-gray-800 p-0.5">
              Departmental Remark Only
            </th>
          </tr>
        </thead>

        {/* <tbody>
          <tr>
            <td class="border border-black font-title text-gray-800 text-[10px] p-0.5">
              {empName ? empName : "-"}
            </td>
            <td class="border border-black font-title text-gray-800 text-[10px] p-0.5">
              {moment(createdAt).format("DD/MM/YYYY")}
            </td>
            <td class="border border-black font-title text-gray-800 text-[10px] p-0.5">
              {post}
            </td>
            <td class="border border-black font-title text-gray-800 text-[10px] p-0.5">
              {headquarters}
            </td>
            <td class="border border-black font-title text-gray-800 text-[10px] p-0.5">
              {area}
            </td>
            <td class="border border-black font-title text-gray-800 text-[10px] p-0.5">
              {workWith}
            </td>
            <td class="border border-black font-title text-gray-800 text-[10px] p-0.5">
              {DcrId}
            </td>
            <td class="border border-black font-title text-gray-800 text-[10px] p-0.5">
              {"-"}
            </td>
            <td class="border border-black font-title text-gray-800 text-[10px] p-0.5"></td>
          </tr>
        </tbody> */}
      </table>
    </>
  );
}
