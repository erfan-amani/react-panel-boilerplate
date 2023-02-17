/*eslint-disable*/
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

import NotificationDropdown from "@/components/Dropdowns/NotificationDropdown";
import UserDropdown from "@/components/Dropdowns/UserDropdown";

import logo from "@/assets/img/logo.png";
import { SIDEBAR_ITEMS } from "./sidebar.config";
import { useDispatch, useSelector } from "react-redux";
import {
  closeSidebar,
  openSidebar,
} from "@/redux/reducers/setting/settingSlice";
import { BRAND } from "@/library/config";

export default function Sidebar() {
  const dispatch = useDispatch();
  const fullSidebar = useSelector((state) => state.setting.fullSidebar);
  const [collapseShow, setCollapseShow] = React.useState("hidden");

  const openFullSidebar = () => {
    dispatch(openSidebar());
  };
  const closeFullSidebar = () => {
    dispatch(closeSidebar());
  };

  return (
    <>
      <nav
        className={`md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-md bg-white flex flex-wrap items-center justify-between relative ${
          fullSidebar ? "md:w-64" : "md:w-sidebar"
        } z-10 py-4 px-6`}
      >
        <div className="relative flex-col gap-4 md:gap-0 md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap  w-full mx-auto">
          {/* Toggler */}
          <div className="flex justify-between items-center gap-4">
            {/* Brand */}
            <div className="flex gap-4 items-center">
              <div className={fullSidebar ? "w-10" : "w-7"}>
                <img src={logo} alt="" />
              </div>

              {fullSidebar && (
                <Link
                  className="md:block text-left text-blueGray-600 inline-block whitespace-nowrap uppercase text-xl font-bold"
                  to="/"
                >
                  {BRAND}
                </Link>
              )}
            </div>

            <button
              className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
              type="button"
              onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>

          {/* User */}
          <div className="md:hidden ml-auto">
            <ul className="items-center flex flex-wrap list-none gap-4">
              <li className="inline-block relative">
                <NotificationDropdown />
              </li>
              <li className="inline-block relative">
                <UserDropdown />
              </li>
            </ul>
          </div>

          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    {BRAND}
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            <hr className="my-4 md:min-w-full" />

            {SIDEBAR_ITEMS.map(({ title, items }, index) => (
              <Fragment key={index}>
                {fullSidebar && (
                  <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                    {title}
                  </h6>
                )}
                <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                  {items.map(({ title, icon: Icon, path }) => (
                    <li key={path} className="items-center">
                      <Link
                        className={
                          "text-xs uppercase py-3 font-semibold flex gap-2 items-center " +
                          `${fullSidebar ? "" : "justify-center "}` +
                          (window.location.href.indexOf({ path }) !== -1
                            ? "text-lightBlue-500 hover:text-lightBlue-600"
                            : "text-blueGray-700 hover:text-blueGray-500")
                        }
                        to={path}
                      >
                        <Icon
                          className={`w-5 ${
                            window.location.href.indexOf({ path }) !== -1
                              ? "opacity-90"
                              : "text-blueGray-500"
                          }`}
                        />

                        {fullSidebar && title}
                      </Link>
                    </li>
                  ))}
                </ul>
                {index !== SIDEBAR_ITEMS?.length - 1 && (
                  <hr className="my-4 md:min-w-full" />
                )}
              </Fragment>
            ))}
          </div>
        </div>

        <div
          className={`fixed hidden md:block ${
            fullSidebar ? "md:w-64" : "w-sidebar"
          } bottom-0 left-0 py-3 px-3 bg-lightBlue-400 text-white z-50`}
        >
          {fullSidebar ? (
            <ChevronDoubleLeftIcon
              className={`w-6 h-6 ${
                fullSidebar ? "ml-auto" : "mx-auto"
              } cursor-pointer`}
              onClick={closeFullSidebar}
            />
          ) : (
            <ChevronDoubleRightIcon
              className={`w-6 h-6 ${
                fullSidebar ? "ml-auto" : "mx-auto"
              } cursor-pointer`}
              onClick={openFullSidebar}
            />
          )}
        </div>
      </nav>
    </>
  );
}
