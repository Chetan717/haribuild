"use client";
import Sidebar from "@/utils/Sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";

import store from "@/ReduxToolkit/Store";
import { NextUIProvider } from "@nextui-org/react";
import AllDataContext from "./DataContext/AllData/AllDataContext";
import Sidebar2 from "@/utils/Sidebar/Sidebar2";
const inter = Inter({ subsets: ["latin"] });
import Login from "./login/page";
export default function RootLayout({ children }) {
  const [userData, setUserData] = useState({});
  // const [load, setLoad] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserData(user);
  }, [userData]);
  return (
    <html lang="en">
      <body className={`${inter.className}  `}>
        <NextUIProvider>
          <Provider store={store}>
            <AllDataContext>
              {/* <Sidebar /> */}

              {userData ? (
                <>
                  <div className="flex flex-row gap-2 justify-start items-start">
                    <Sidebar2 />
                    <div className="flex flex-1 m-5 h-full border rounded-lg border-gray-200 justify-center items-center">
                      {children}
                    </div>
                  </div>
                </>
              ) : (
                <Login />
              )}
            </AllDataContext>
          </Provider>
        </NextUIProvider>
      </body>
    </html>
  );
}
