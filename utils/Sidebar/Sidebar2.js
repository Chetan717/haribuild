"use client";
import React, { useState } from "react"; // Import useState from "react"
// Remove Button import since it's not used
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSideBarTab } from "@/ReduxToolkit/Slices/UiCompSlice/SideBarTab";
import { useRouter } from "next/navigation";
import {
  Container,
  Header,
  Sidebar,
  Sidenav,
  Content,
  Navbar,
  Nav,
} from "rsuite";
import CogIcon from "@rsuite/icons/legacy/Cog";
import AngleLeftIcon from "@rsuite/icons/legacy/AngleLeft";
import AngleRightIcon from "@rsuite/icons/legacy/AngleRight";
import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import DashboardIcon from "@rsuite/icons/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import DocPassIcon from "@rsuite/icons/DocPass";
import AttachmentIcon from "@rsuite/icons/Attachment";
import PeoplesIcon from "@rsuite/icons/Peoples";
import EventDetailIcon from "@rsuite/icons/EventDetail";
import AdminIcon from "@rsuite/icons/Admin";
import GridIcon from "@rsuite/icons/Grid";
import "rsuite/dist/rsuite-no-reset.min.css";
import Link from "next/link";
import DashInfo from "@/app/Home/DashInfo";

const NavToggle = ({ expand, onChange }) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle rounded-xl">
      <Nav>
        <Nav.Menu
          noCaret
          placement="topStart"
          trigger="click"
          title={<CogIcon style={{ width: 20, height: 20 }} size="sm" />}
        >
          <Nav.Item>Help</Nav.Item>
          <Nav.Item>Settings</Nav.Item>
          <Nav.Item>Sign out</Nav.Item>
        </Nav.Menu>
      </Nav>

      <Nav pullRight>
        <Nav.Item onClick={onChange} style={{ width: 56, textAlign: "center" }}>
          {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

const tabs = [
  { name: "Dashboard", link: "/", icon: <DashboardIcon /> },
  { name: "Master", link: "/Tabs", icon: <PeoplesIcon /> },
  {
    name: "TourProgram",
    link: "/CreateTourProgram",
    icon: <EventDetailIcon />,
  },
  { name: "Reporting", link: "/TourProgram", icon: <DocPassIcon /> },
  { name: "Product", link: "/", icon: <GridIcon /> },
  { name: "Attachment", link: "/", icon: <AttachmentIcon /> },
  { name: "Accounts", link: "/", icon: <AdminIcon /> },
  { name: "Setting", link: "/", icon: <GearCircleIcon /> },
];

export default function Sidebar2() {
  const router = useRouter();
  const [expanded, setExpanded] = React.useState(false);
  const [active, setActive] = useState("DashBoard");

  const dispatch = useDispatch();
  const controll = (i) => {
    dispatch(setSideBarTab);
    setActive(i);
  };
  const taba = useSelector((state) => {
    return state.SideBarTab;
  });

  return (
    <>
      <div className="relative flex  flex-col gap-10   border h-full mt-3 ml-3 border-gray-00 justify-start items-start">
        <Sidebar
          style={{ display: "flex", flexDirection: "column" }}
          width={expanded ? 230 : 50}
          collapsible
        >
          <Sidenav.Header className="flex flex-row justify-start  items-center p-2 bg-white text-black">
            {expanded ? (
              <>
                <AcmeLogo />{" "}
                <span className="font-semibold text-black">
                  {" "}
                  Avirosa pharmachem
                </span>
              </>
            ) : (
              <AcmeLogo />
            )}
          </Sidenav.Header>
          <Sidenav
            expanded={expanded}
            defaultOpenKeys={["3"]}
            appearance="subtle"
          >
            <Sidenav.Body>
              <Nav>
                {tabs.map((tab) => {
                  return (
                    <>
                      <Nav.Item
                        onClick={() => router.push(`${tab.link}`)}
                        eventKey="1"
                        active
                        icon={tab.icon}
                      >
                        <p className=""> {tab.name}</p>
                      </Nav.Item>
                    </>
                  );
                })}
              </Nav>
            </Sidenav.Body>
            <Sidenav.Toggle
              expand={expanded}
              onToggle={(expanded) => setExpanded(expanded)}
            />
          </Sidenav>
        </Sidebar>
      </div>
    </>
  );
}
