import React from "react";

export default function StockiestDetails({ AllStockByDate }) {
  console.log(AllStockByDate, "stock");
  return (
    <>
      <table class="border  border-black text-center">
        <thead>
          {AllStockByDate?.length === 0 ? (
            <th class="border border-black text-center text-xs font-bold text-gray-800 p-0">
              #####_No Data Available_#####
            </th>
          ) : (
            <tr>
              <th class="border border-black text-center text-[10px] font-semibold text-gray-800 p-0.">
                SR.NO
              </th>
              <th class="border border-black text-center text-[10px] font-semibold text-gray-800 p-0.">
                Code no
              </th>
              <th class="border border-black text-center text-[10px] font-semibold text-gray-800 p-0.">
                Stockiest Name
              </th>
              <th class="border border-black text-center text-[10px] font-semibold text-gray-800 p-0.">
                Collections
              </th>
              <th
                colSpan=""
                class="border border-black text-center text-[10px] font-semibold text-gray-800 p-0."
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
          {AllStockByDate?.map((i, index) => {
            return (
              <>
                <tr key={i}>
                  <td class="border border-black p-0. text-xs">{index + 1}</td>
                  <td class="border border-black p-0. text-xs">{i.Code}</td>
                  <td class="border border-black p-0. text-xs">{i.Name}</td>
                  <td class="border border-black p-0. text-xs">
                    {i.Collection}
                  </td>
                  {i?.Pob?.map((key) => {
                    return (
                      <>
                        <td
                          key={key}
                          class="border border-black p-0. text-[10px]"
                        >
                          Product :{" "}
                          <span className="text-[10px] font-semibold text-black">
                            {key.Product}
                          </span>{" "}
                          | Qnt :{" "}
                          <span className="text-[10px] font-semibold text-black">
                            {key.Qnt}
                          </span>{" "}
                          | value :
                          <span className="text-[10px] font-semibold text-black">
                            {Number(key.Qnt) * Number(key.value)}
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
