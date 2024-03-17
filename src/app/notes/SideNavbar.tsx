"use client";
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
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import { useTheme } from "next-themes";

function SideNavbar() {
  const { theme } = useTheme();
  const sidebarBgColor = theme === "dark" ? "dark" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-gray-800";
  return (
    <div className="h-screen overflow-y-auto">
      <Disclosure>
        <Disclosure.Button
          className={`dark group peer absolute right-4 top-4 inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
        >
          <GiHamburgerMenu
            className="block h-6 w-6 md:hidden"
            aria-hidden="true"
          />
        </Disclosure.Button>
        <div
          className={`peer:transition dark fixed -left-96 top-0 z-20 h-screen w-1/2 p-6 delay-150  duration-200 ease-out peer-focus:left-0 lg:left-0 lg:w-60`}
        >
          <div className="item-center flex flex-col justify-start">
            <br />

            <h1
              className={`dark w-full cursor-pointer border-b pb-4 text-center text-base font-bold`}
            >
              Contenido
            </h1>

            <div className="my-4 overflow-y-auto border-b border-gray-100 pb-4">
              <div className=" my-4 border-b border-gray-100 pb-4">
                <Link href={"/notes"} className="">
                  <div className="group  m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg">
                    <CgProfile className="text-2xl text-gray-600 group-hover:text-white " />
                    <h3
                      className={`dark text-base font-semibold group-hover:text-white `}
                    >
                      Inicio
                    </h3>
                  </div>
                </Link>
                <Link
                  href={"/notes/documentacion/otros_documentos/documentos"}
                  className=""
                >
                  <div className="group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg">
                    <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white " />
                    <h3
                      className={`dark text-base font-semibold group-hover:text-white `}
                    >
                      Docs
                    </h3>
                  </div>
                </Link>
              </div>

              <Link href={"/notes/preliminares"} className="">
                <div className="group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg">
                  <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3
                    className={`dark text-base font-semibold group-hover:text-white `}
                  >
                    Preliminares
                  </h3>
                </div>
              </Link>
              <Link href={"/notes/planteamiento"} className="">
                <div className="group  m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg">
                  <CgProfile className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3
                    className={`dark text-base font-semibold group-hover:text-white `}
                  >
                    Planteamiento
                  </h3>
                </div>
              </Link>
              <Link href={"/notes/literatura"} className="">
                <div className="group  m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg">
                  <CgProfile className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3
                    className={`dark text-base font-semibold group-hover:text-white `}
                  >
                    Literatura
                  </h3>
                </div>
              </Link>
              <Link href={"/notes/metologia"} className="">
                <div className="group  m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg">
                  <BiMessageSquareDots className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3
                    className={`dark text-base font-semibold group-hover:text-white `}
                  >
                    Metologia
                  </h3>
                </div>
              </Link>
              <Link href={"/notes/resultados"} className="">
                <div className="group  m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg">
                  <MdOutlineIntegrationInstructions className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3
                    className={`dark text-base font-semibold group-hover:text-white `}
                  >
                    Resultados
                  </h3>
                </div>
              </Link>
              <Link href={"/notes/discusion"} className="">
                <div className="group  m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg">
                  <MdOutlineIntegrationInstructions className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3
                    className={`dark text-base font-semibold group-hover:text-white `}
                  >
                    Discusion
                  </h3>
                </div>
              </Link>
              <Link href={"/notes/conclusiones"} className="">
                <div className="group  m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg">
                  <MdOutlineIntegrationInstructions className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3
                    className={`dark text-base font-semibold group-hover:text-white `}
                  >
                    Conclusiones
                  </h3>
                </div>
              </Link>
            </div>

            <div className=" my-4 border-b border-gray-100 pb-4">
              <Link href={"/notes/consolidado"} className="">
                <div className="group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg">
                  <MdOutlineSettings className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3
                    className={`dark text-base font-semibold group-hover:text-white `}
                  >
                    Consolidado
                  </h3>
                </div>
              </Link>
            </div>
            <div className=" my-4">
              <div className="group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4  rounded-md border border-gray-200 p-2 pl-5 hover:bg-gray-900 hover:shadow-lg">
                <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
                <h3
                  className={`dark text-base font-semibold group-hover:text-white `}
                >
                  Salir
                </h3>
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

export default SideNavbar;
