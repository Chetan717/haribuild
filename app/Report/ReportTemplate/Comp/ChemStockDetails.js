import React from "react";

export default function ChemStockDetails({ AllChemByDate }) {

  console.log(AllChemByDate,"chem");

  return (
    <>
     <table class="border  border-black text-center">
        <thead>
          {AllChemByDate?.length === 0 ? (
            <th class="border border-black text-center text-xs font-bold text-gray-800  ">
              #####_No Data Available_#####
            </th>
          ) : (
            <tr className="p-1">
              <th class="border border-black text-center text-xs font-bold text-gray-800  ">
                SR.NO
              </th>
              <th class="border border-black text-center text-xs font-bold text-gray-800  ">
                Code no
              </th>
              <th class="border border-black text-center text-xs font-bold text-gray-800  ">
                Chemist Name
              </th>

              <th class="border border-black text-center text-xs font-bold text-gray-800  ">
                POB
              </th>
            </tr>
          )}
        </thead>

        <tbody>
          {AllChemByDate?.map((i, index) => {
            return (
              <>
                <tr className="p-1" key={i}>
                  <td class="border border-black  text-xs">{index + 1}</td>
                  <td class="border border-black  text-xs">{i.chemCode}</td>
                  <td class="border border-black  text-xs">{i.chemName}</td>
                  {i?.Pob?.map((key) => {
                    return (
                      <>
                        <td key={key} class="border border-black  text-[10px]">
                          Product :{" "}
                          <span className="text-[10px] font-semibold text-black">
                            {key.Product}
                          </span>{" "}
                          | Qnt :{" "}
                          <span className="text-[10px] font-semibold text-black">
                            {key.Qnt}
                          </span>{" "}
                          | value :{" "}
                          <span className="text-[10px] font-semibold text-black">
                            {Number(key.Qnt) * Number(key.value)}
                          </span>
                        </td>
                      </>
                    );
                  })}
                </tr>
              </>
            );
          })}
        </tbody>
      </table> 
    </>
  );
}
