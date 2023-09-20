import { Button, Input } from "@nextui-org/react";
import React from "react";

export default function DataQueryLimitor({
  dataLimit,
  HandleDataLimitor,
  GetDataUsingLimitor,
}) {
  return (
    <>
      <div className="flex  rounded-lg p-2 flex-row gap-2 justify-center items-center">
        <Input
          isClearable
          value={dataLimit.first}
          onChange={(e) => HandleDataLimitor(e)}
          radius="lg"
          placeholder="1st-index"
          name="first"
          size="sm"
          className="w-[100px] "
        />
        <p className="text-black font-bold text-xs">To</p>
        <Input
          isClearable
          placeholder="last-index"
          value={dataLimit.last}
          onChange={(e) => HandleDataLimitor(e)}
          radius="lg"
          name="last"
          size="sm"
          className="w-[100px] "
        />
        <Button
          onClick={() => GetDataUsingLimitor(dataLimit)}
          size="sm"
          className="bg-black text-white"
        >
          Get Data
        </Button>
      </div>
    </>
  );
}
