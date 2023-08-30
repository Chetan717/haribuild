import React from "react";
import { Button } from "@nextui-org/react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import EditTourDate from "./EditTourDate";
import { useEffect } from "react";
import CreateTour from "./CreateTour";
import axios from "axios";
export default function TourDateList({ dcr }) {
  const [dataTour, setDataTour] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const Server = process.env.NEXT_PUBLIC_SERVER_NAME;
  useEffect(() => {
    getDataTour(dcr);
  }, []);

  const getDataTour = (dcr) => {
    axios
      .get(`${Server}/add/tourDateUser/${dcr?.DcrId}`)
      .then((res) => {
        setDataTour(res.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // const getDataByDate = (Date) => {
  //   const dataDate = dataTour.filter((i) => i.Date === Date);
  //   return dataDate;
  // };

  return (
    <>
      {dataTour ? (
        <div className="grid grid-cols-3 gap-3">
          {dataTour?.map((item) => {
            return (
              <>
                <Card className="m-1" isPressable>
                  <CardFooter className="text-small flex flex-row justify-center items-center gap-5 p-3">
                    <p>📅</p>
                    <div className="text-small flex flex-row justify-center items-center gap-4">
                      <b>{item.Date}</b>

                      <CreateTour TpData={item} getDataTour={getDataTour} />
                    </div>
                  </CardFooter>
                </Card>
              </>
            );
          })}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
