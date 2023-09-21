import React, { useEffect, useState, useMemo, useContext } from "react";
import axios from "axios";
import { createContext } from "react";

const AllFieldDataContext = createContext();

export default function AllDataContext({ children }) {
  const Server = process.env.NEXT_PUBLIC_SERVER_NAME;

  const [allEmpData, setAllEmpData] = useState([]);
  const [allDoc, setAllDoc] = useState([]);
  const [allChem, setAllChem] = useState([]);
  const [allArea, setAllArea] = useState([]);
  const [allHeadQ, setAllHeadQ] = useState([]);
  const [allStdFare, setAllStdFare] = useState([]);
  const [allProdRate, setAllProdRate] = useState([]);
  const [allStockiest, setAllStockiest] = useState([]);
  const [user, setUser] = useState({});

  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const userinfo = JSON.parse(localStorage?.getItem("user")) || {};
    setUser(userinfo);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        userDataResponse,
        docResponse,
        chemResponse,
        areaResponse,
        headqResponse,
        stdfareResponse,
        proRateResponse,
        stockResponse,
      ] = await axios.all([
        axios.get(`${Server}/user/UserDetail`),
        axios.get(`${Server}/add/doc`),
        axios.get(`${Server}/add/chem`),
        axios.get(`${Server}/add/area`),
        axios.get(`${Server}/add/headq`),
        axios.get(`${Server}/add/stdfare`),
        axios.get(`${Server}/add/proRate`),
        axios.get(`${Server}/add/stock`),
      ]);

      setAllEmpData({
        userData: userDataResponse.data,
      });
      setAllDoc({
        docData: docResponse.data,
      });
      setAllChem({
        chemData: chemResponse.data,
      });
      setAllArea({
        areaData: areaResponse,
      });
      setAllHeadQ({
        headqData: headqResponse,
      });
      setAllStdFare({
        stdfareData: stdfareResponse.data,
      });
      setAllProdRate({
        proRateData: proRateResponse.data,
      });
      setAllStockiest({
        stockData: stockResponse.data,
      });

      setFlag(true);
    } catch (error) {}
  };

  const headquaters = allHeadQ?.headqData?.data?.map(
    (key) => key.HeadQuaterName
  );
  const AreasOption = allArea?.areaData?.data?.map((key) => key.AreaName);

  const memoizedContextValue = useMemo(() => {
    return {
      allEmpData,
      allDoc,
      allArea,
      allChem,
      allHeadQ,
      allStdFare,
      allStockiest,
      headquaters,
      AreasOption,
      allProdRate,
      flag,
      user,
      fetchData,
    };
  }, [allEmpData]);

  return (
    <AllFieldDataContext.Provider value={memoizedContextValue}>
      {children}
    </AllFieldDataContext.Provider>
  );
}

const useGlobalContext = () => {
  return useContext(AllFieldDataContext);
};

export { AllFieldDataContext, useGlobalContext, AllDataContext };
