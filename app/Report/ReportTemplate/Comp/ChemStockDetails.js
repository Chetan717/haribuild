import React from "react";
import axios from "axios";
import { Button } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
export default function ChemStockDetails({ AllChemByDate }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [response, setResponse] = React.useState({});
  const Server = process.env.NEXT_PUBLIC_SERVER_NAME;
  const handleDeleteDcr = (idparam) => {
    const apiUrl = `${Server}/add/chemDcr/${idparam}`;
    // docDcr
    // stockDcr
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
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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
              <th class="border border-black text-center text-xs font-bold text-gray-800  ">
                Location
              </th>
              <th class="border border-black text-center text-xs font-bold text-gray-800  ">
                Action
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
                  <td class="border border-black  text-[10px]">
                    {i.lat} , {i.log}
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
