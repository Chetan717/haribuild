import React from "react";

export default function DoctorDetails({ AllDocByDate }) {
  console.log(AllDocByDate, "doc");
  return (
    <>
      <table className="border  border-black text-center">
        <thead>
          {AllDocByDate?.length === 0 ? (
            <th class="border border-black text-center text-xs font-bold text-gray-800 p-0">
              #####_No Data Available_#####
            </th>
          ) : (
            <tr>
              <th className="border border-black text-center text-[10px] font-semibold text-gray-800 p-0">
                SR.NO
              </th>
              <th className="border border-black text-center text-[10px] font-semibold text-gray-800 p-0">
                Code NO
              </th>
              <th className="border border-black text-center text-[10px] font-semibold text-gray-800 p-0">
                Doctor Name
              </th>
              <th className="border border-black text-center text-[10px] font-semibold text-gray-800 p-0">
                Qualification
              </th>
              <th className="border border-black text-center text-[10px] font-semibold text-gray-800 p-0">
                Speciality
              </th>
              <th
                colspan="2"
                className="border border-black text-center text-[10px] font-semibold text-gray-800 p-0"
              >
                Targeted Product
              </th>

              <th className="border border-black text-center text-[10px] font-semibold text-gray-800 p-0">
                Lit-Y/N
              </th>
              <th className="border border-black text-center text-[10px] font-semibold text-gray-800 p-0">
                Detail - Y/N
              </th>
              <th className="border border-black text-center text-[10px] font-semibold text-gray-800 p-0">
                Doctor Specify Commitment in Word
              </th>
              <th
                colspan=""
                className="border border-black text-center text-[10px] font-semibold text-gray-800 p-0"
              >
                POB
              </th>
              <th class="border border-black text-center text-xs font-bold text-gray-800  ">
                Location
              </th>
            </tr>
          )}
        </thead>

        <tbody>
          {AllDocByDate?.map((i, index) => {
            return (
              <>
                <tr key={index}>
                  <td className="border border-black p-0 text-[10px]">
                    {index + 1}
                  </td>
                  <td className="border border-black p-0 text-[10px]">
                    {i?.DoctorCode}
                  </td>
                  <td className="border border-black p-0 text-[10px]">
                    {i?.DoctorName}
                  </td>
                  <td className="border border-black p-0 text-[10px]">
                    {i?.Degree}
                  </td>
                  <td className="border border-black p-0 text-[10px]">
                    {i?.Speciality}
                  </td>
                  <td className="border border-black p-0 text-[10px]">
                    {i?.P1}
                  </td>
                  <td className="border border-black p-0 text-[10px]">
                    {i?.P2}
                  </td>

                  <td className="border border-black p-0 text-[10px]">
                    {i?.lit === true ? "Yes" : "No"}
                  </td>
                  <td className="border border-black p-0 text-[10px]">
                    {i?.Detail === true ? "Yes" : "No"}
                  </td>
                  <td className="border border-black p-0 text-[10px]">
                    {i?.Remark || "No Remark"}
                  </td>
                  {i?.Pob?.map((k) => {
                    return (
                      <>
                        <td key={k} class="border border-black p-0 text-[10px]">
                          Product :{" "}
                          <span className="text-[10px] font-semibold text-black">
                            {k.Product}
                          </span>{" "}
                          | Qnt :{" "}
                          <span className="text-[10px] font-semibold text-black">
                            {k.Qnt}
                          </span>{" "}
                          | value :{" "}
                          <span className="text-[10px] font-semibold text-black">
                            {Number(k.Qnt) * Number(k.value)}
                          </span>
                        </td>
                      </>
                    );
                  })}
                  <td class="border border-black  text-[10px]">
                    lat : {i.lat} , log : {i.log}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
