"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Input, Button } from "@nextui-org/react";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  const [error, setError] = useState();
  const [user, setUser] = useState({
    userId: "",
    pass: "",
  });
  const Server = process.env.NEXT_PUBLIC_SERVER_NAME;
  const [flag, setFlag] = useState(false);

  function handleinput(e) {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const HandleSignin = (userId, pass) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (userId.length < 1) {
      toast.error("User-Id not Entered");
    }

    if (pass?.length < 8) {
      toast.error("Password  be a 8 characters");
      return;
    } else {
      setFlag(true);
    }

    axios
      .post(`${Server}/user/Signin`, { userId, pass })
      .then((res) => {
        axios
          .get(`${Server}/user/auth`, {
            headers: {
              Authorization: `Bearer ${res.data}`, // Use the tobyn the token variable here instead of res.data
            },
          })
          .then((response) => {
            const userData = JSON.stringify(response.data);
            const res = response?.data;
            if (res?.userId === "Vijay123") {
              localStorage.setItem("user", userData);
              toast.success("Sign in successful!");
            } else {
              toast.error("You Are Not Admin!");
            }
          })
          .catch((error) => {
            setError(error);
          });
      })

      .catch((err) => {
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        if (error?.response?.data.message) {
          
        } else {
          setTimeout(() => {
            setFlag(false);
            window.location.reload();
          }, 2000);
        }
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

      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col w-3/1 gap-4 justify-center items-center  bg-white p-3 rounded-lg shadow-lg h-[300px] ">
          <h1 className="text-black font-semibold text-[18px]">Login Now !</h1>
          <form className="flex flex-col gap-4 w-[300px] ">
            <Input
              isRequired
              label="User-Id"
              placeholder="Enter your UserId"
              type="text"
              onChange={handleinput}
              value={user.userId}
              name="userId"
            />
            <Input
              isRequired
              label="Password"
              placeholder="Enter your password"
              onChange={handleinput}
              type="password"
              name="pass"
            />

            <div className="flex gap-2 justify-end">
              {flag ? (
                <Button
                  isLoading
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
                <Button
                  color="black"
                  className="bg-black text-white"
                  onClick={() => HandleSignin(user.userId, user.pass)}
                >
                  Login Now
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
