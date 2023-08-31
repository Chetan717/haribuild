import React from "react";

export default function BootomDtails({ cTotal, dtotal, sTotal }) {
  return (
    <>
      <table class="border  border-black text-center">
        <thead>
          <tr>
            <th class="border border-black text-center text-[10px] font-bold text-gray-800 ">
              DOCTORS CALLS
            </th>
            <th class="border border-black text-center text-[10px] font-bold text-gray-800 ">
              CHEMIST CALLS
            </th>
            <th class="border border-black text-center text-[10px] font-bold text-gray-800 ">
              STOCKIEST CALLS
            </th>
            <th class="border border-black text-center text-[10px] font-bold text-gray-800 ">
              CHEMIST POB
            </th>
            <th class="border border-black text-center text-[10px] font-bold text-gray-800 ">
              COLLECTION
            </th>
            <th class="border border-black text-center text-[10px] font-bold text-gray-800 ">
              MANAGER REMARK AREA
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="border border-black  text-[10px]">{dtotal}</td>
            <td className="border border-black  text-[10px]">{cTotal}</td>
            <td className="border border-black  text-[10px]">{sTotal}</td>
            <td className="border border-black  text-[10px]">-</td>
            <td className="border border-black  text-[10px]">-</td>
            <td className="border border-black  text-[10px]">-</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
