import React from "react";
import axios from "axios";
import { Button } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
export default function StockiestDetails({ AllStockByDate }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [response, setResponse] = React.useState({});
  const Server = process.env.NEXT_PUBLIC_SERVER_NAME;

  const handleDeleteDcr = (idparam) => {
    const apiUrl = `${Server}/add/stockDcr/${idparam}`;
    setIsLoading(true);
    setHasError(false);

    axios
      .delete(apiUrl)
      .then((response) => {
        const responseData = response.data;
        setResponse(responseData);

        toast.success(`${response?.data?.message}`);
      })
      .catch((error) => {
        setHasError(true);
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
              <th class="border border-black text-center text-xs font-bold text-gray-800  ">
                Punch Time
              </th>
              <th class="border border-black text-center text-xs font-bold text-gray-800  ">
                Action
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
                    {i.lat} , {i.log}
                  </td>
                  <td class="border border-black  text-[10px]">
                    {i?.time}
                  </td>
                  <td class="border border-black p-1 text-[10px] ">
                    {isLoading ? (
                      <Button
                        isLoading
                        size="sm"
                        className="bg-black text-white"
                        spinner={
                          <svg
                            className="animate-spin h-5 w-5 text-current"
                            fill="none"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              fill="currentColor"
                            />
                          </svg>
                        }
                      >
                        Wait..
                      </Button>
                    ) : (
                      <>
                        <Button
                          color="black"
                          size="sm"
                          className="bg-black text-white"
                          onClick={() => handleDeleteDcr(i._id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
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
