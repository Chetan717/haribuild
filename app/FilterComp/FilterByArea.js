// export default function FilterByArea({ value, setValue }) {

//   return (
//     <>
//       <CheckPicker
//         value={value}
//         onChange={setValue}
//         label="Area"
//         size="lg"
//         data={data}
//         style={{ width: 224 }}
//       />
//     </>
//   );
// }

import React from "react";
import { useGlobalContext } from "../DataContext/AllData/AllDataContext";
import { Select, SelectItem } from "@nextui-org/react";

export default function FilterByArea({ value, setValue, valueAp, setValueAp }) {
  const { AreasOption } = useGlobalContext();
  const data = AreasOption?.map((item) => ({ label: item, value: item }));
  return (
    <>
      <div className="flex flex-row gap-4">
        <select
          className="border border-black rounded-lg h-[40px] text-sm p-2 cursor-pointer"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          <option value="">Select Area</option>
          {AreasOption?.map((i) => {
            return (
              <>
                <option value={i}>{i}</option>
              </>
            );
          })}
        </select>
        {/* <select
          className="border border-black rounded-lg h-[40px] text-sm p-2 cursor-pointer"
          value={valueAp}
          onChange={(e) => setValueAp(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value={true}>Approved</option>
          <option value={false}>UnApproved</option>
        </select> */}
      </div>
    </>
  );
}
