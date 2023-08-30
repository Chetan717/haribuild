import React from "react";
import DCrShow from "../DCrShow";
import axios from "axios";
import { useEffect, useState } from "react";

import moment from "moment";
moment().format();
export default function SelectTp({ UserId }) {
  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState();
  const [load, setLoad] = React.useState(false);
  const [dataDcr, setDataDcr] = React.useState(false);

  const Server = process.env.NEXT_PUBLIC_SERVER_NAME;

  useEffect(() => {
    handleGetDataByUserId();
  }, []);

  const handleGetDataByUserId = () => {
    axios
      .get(`${Server}/add/tourUser/${UserId}`)
      .then((res) => {
        setDataDcr(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoad(false);
      });
  };

  const DataTp = dataDcr || [];

  const [sel, setSel] = useState();

  const idDcr = DataTp?.filter((i) => i.DcrId === sel);

  return (
    <>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col justify-center ">
          <select
            className="outline-none font-semibold cursor-pointer text-gray-600 border-1 bg-transparent text-small w-[300px] h-[50px] rounded-lg bg-gray-200 p-2"
            id="sel"
            name="sel"
            value={sel}
            onChange={(e) => setSel(e.target.value)}
            required
          >
            <option value="">Select Date</option>
            {DataTp?.map((i) => {
              return (
                <>
                  <option key={i.startDate} value={i.DcrId}>
                    {moment(i.startDate).format("DD/MM/YYYY")}_to_
                    {moment(i.lastDate).format("DD/MM/YYYY")}`
                  </option>
                </>
              );
            })}
          </select>
        </div>
        <DCrShow dcrID={idDcr} selID={sel} />
      </div>
    </>
  );
}
