import React from "react";
import moment from "moment";
moment().format();

export default function ExecutiveInfo({ AllDocByDate, dcrID }) {
  const userId = JSON.parse(localStorage?.getItem("user")) || "admin";

  // const data = AllDocByDate[0] || AllDocByDate;
  // const { Area, DcrId, createdAt, workWith } = data;
  // const { empName, headquarters, mobile1, post, selectedAreas } = userId;

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
              Actual_TP
            </th>
            <th class="border border-black text-center text-[10px] font-bold text-gray-800 p-0.5">
              Work_With
            </th>
            <th class="border border-black text-center text-[10px] font-bold text-gray-800 p-0.5">
              DCR_ID
            </th>

            <th class="border border-black text-center text-[10px] font-bold text-gray-800 p-0.5">
              Departmental Remark Only
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td class="border border-black font-title text-gray-800 text-[10px] p-0.5">
              {dcrID[0]?.createdByName ? dcrID[0]?.createdByName : "-"}
            </td>
            <td class="border border-black font-title text-gray-800 text-[10px] p-0.5">
              {moment(dcrID[0]?.createdAt).format("DD/MM/YYYY")}
            </td>
            <td class="border border-black font-title text-gray-800 text-[10px] p-0.5">
              {dcrID[0]?.post}
            </td>
            {dcrID[0]?.area?.map((i) => {
              return (
                <>
                  <td class="border border-black font-title text-gray-800 text-[10px] p-0.5">
                    {i}
                  </td>
                </>
              );
            })}

            <td class="border border-black font-title text-gray-800 text-[10px] p-0.5">
              {AllDocByDate === undefined ? "-" : AllDocByDate[0]?.workWith}
            </td>

            <td class="border border-black font-title text-gray-800 text-[10px] p-0.5">
              {dcrID[0]?.DcrId}
            </td>

            <td class="border border-black font-title text-gray-800 text-[10px] p-0.5"></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
