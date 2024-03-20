import Link from "next/link";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineIntegrationInstructions,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
  MdOutlinePayment,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import { useTheme } from "next-themes";
import SubscriptionDialog from "@/components/subscription-dialog";
import SideNavbarUI from "@/components/SideNavbarUI";

function SideNavbar() {
  const { theme } = useTheme();

  // const handleSubscriptionDialogOpen = () => {
  //   console.log(subscriptionDialogOpen);
  //   setSubscriptionDialogOpen((prev) => !prev);
  // };

  const sidebarBgColor = theme === "dark" ? "dark" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-gray-800";
  return <SideNavbarUI />;
}

export default SideNavbar;
