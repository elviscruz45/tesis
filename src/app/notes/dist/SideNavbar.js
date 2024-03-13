"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var gi_1 = require("react-icons/gi");
var react_2 = require("@headlessui/react");
var md_1 = require("react-icons/md");
var cg_1 = require("react-icons/cg");
var fa_1 = require("react-icons/fa");
var bi_1 = require("react-icons/bi");
var next_themes_1 = require("next-themes");
function SideNavbar() {
    var theme = next_themes_1.useTheme().theme;
    var sidebarBgColor = theme === "dark" ? "bg-black" : "bg-white";
    var textColor = theme === "dark" ? "text-white" : "text-gray-800";
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(react_2.Disclosure, { as: "nav" },
            react_1["default"].createElement(react_2.Disclosure.Button, { className: "group peer absolute right-4 top-4 inline-flex items-center justify-center rounded-md p-2 " + textColor + " hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" },
                react_1["default"].createElement(gi_1.GiHamburgerMenu, { className: "block h-6 w-6 md:hidden", "aria-hidden": "true" })),
            react_1["default"].createElement("div", { className: "peer:transition fixed -left-96 top-0 z-20 h-screen w-1/2 " + sidebarBgColor + " p-6 delay-150  duration-200 ease-out peer-focus:left-0 lg:left-0 lg:w-60" },
                react_1["default"].createElement("div", { className: "item-center flex flex-col justify-start" },
                    react_1["default"].createElement("h1", { className: "w-full cursor-pointer border-b border-gray-100 pb-4 text-center text-base font-bold text-blue-900" }, "Virtual Dashboard"),
                    react_1["default"].createElement("div", { className: " my-4 border-b border-gray-100 pb-4" },
                        react_1["default"].createElement("div", { className: "group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg" },
                            react_1["default"].createElement(md_1.MdOutlineSpaceDashboard, { className: "text-2xl text-gray-600 group-hover:text-white " }),
                            react_1["default"].createElement("h3", { className: "text-base font-semibold " + textColor + " group-hover:text-white " }, "Dashboard")),
                        react_1["default"].createElement("div", { className: "group  m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg" },
                            react_1["default"].createElement(cg_1.CgProfile, { className: "text-2xl text-gray-600 group-hover:text-white " }),
                            react_1["default"].createElement("h3", { className: "text-base font-semibold " + textColor + " group-hover:text-white " },
                                " ",
                                "Profile")),
                        react_1["default"].createElement("div", { className: "group  m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg" },
                            react_1["default"].createElement(fa_1.FaRegComments, { className: "text-2xl text-gray-600 group-hover:text-white " }),
                            react_1["default"].createElement("h3", { className: "text-base font-semibold " + textColor + " group-hover:text-white " },
                                " ",
                                "Comments")),
                        react_1["default"].createElement("div", { className: "group  m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg" },
                            react_1["default"].createElement(md_1.MdOutlineAnalytics, { className: "text-2xl text-gray-600 group-hover:text-white " }),
                            react_1["default"].createElement("h3", { className: "text-base font-semibold " + textColor + " group-hover:text-white " },
                                " ",
                                "Analytics")),
                        react_1["default"].createElement("div", { className: "group  m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg" },
                            react_1["default"].createElement(bi_1.BiMessageSquareDots, { className: "text-2xl text-gray-600 group-hover:text-white " }),
                            react_1["default"].createElement("h3", { className: "text-base font-semibold " + textColor + " group-hover:text-white " },
                                " ",
                                "Messages")),
                        react_1["default"].createElement("div", { className: "group  m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg" },
                            react_1["default"].createElement(md_1.MdOutlineIntegrationInstructions, { className: "text-2xl text-gray-600 group-hover:text-white " }),
                            react_1["default"].createElement("h3", { className: "text-base font-semibold " + textColor + " group-hover:text-white " },
                                " ",
                                "Integration"))),
                    react_1["default"].createElement("div", { className: " my-4 border-b border-gray-100 pb-4" },
                        react_1["default"].createElement("div", { className: "group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg" },
                            react_1["default"].createElement(md_1.MdOutlineSettings, { className: "text-2xl text-gray-600 group-hover:text-white " }),
                            react_1["default"].createElement("h3", { className: "text-base font-semibold " + textColor + " group-hover:text-white " },
                                " ",
                                "Settings")),
                        react_1["default"].createElement("div", { className: "group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg" },
                            react_1["default"].createElement(md_1.MdOutlineMoreHoriz, { className: "text-2xl text-gray-600 group-hover:text-white " }),
                            react_1["default"].createElement("h3", { className: "text-base font-semibold " + textColor + " group-hover:text-white " },
                                " ",
                                "More"))),
                    react_1["default"].createElement("div", { className: " my-4" },
                        react_1["default"].createElement("div", { className: "group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4  rounded-md border border-gray-200 p-2 pl-5 hover:bg-gray-900 hover:shadow-lg" },
                            react_1["default"].createElement(md_1.MdOutlineLogout, { className: "text-2xl text-gray-600 group-hover:text-white " }),
                            react_1["default"].createElement("h3", { className: "text-base font-semibold " + textColor + " group-hover:text-white " },
                                " ",
                                "Logout"))))))));
}
exports["default"] = SideNavbar;
