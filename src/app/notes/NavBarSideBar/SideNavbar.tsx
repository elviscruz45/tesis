// import Link from "next/link";
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
// import SubscriptionDialog from "@/components/subscription-dialog";
import SideNavbarUI from "@/components/SideNavbarUI";
// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from "mercadopago";
import { redirect } from "next/dist/server/api-utils";

async function SideNavbar() {
  // const { theme } = useTheme();
  // Agrega credenciales
  // // const handleSubscriptionDialogOpen = () => {
  // //   setSubscriptionDialogOpen((prev) => !prev);
  // // };
  // const sidebarBgColor = theme === "dark" ? "dark" : "bg-white";
  // const textColor = theme === "dark" ? "text-white" : "text-gray-800";
  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN!,
  });

  const preference = new Preference(client);

  try {
    const response = await preference.create({
      body: {
        items: [
          {
            id: "donacion",
            title: "Mi producto",
            quantity: 1,
            unit_price: 20,
          },
        ],
      },
    });
  } catch (error) {
    console.log(error);
  }

  // redirect(preference.sandbox_init_point!, { permanent: false });

  // .then(console.log)
  // .catch(console.log);

  return <SideNavbarUI />;
}

export default SideNavbar;
