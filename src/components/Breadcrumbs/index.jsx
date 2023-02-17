import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";
import React from "react";
import { PortalWithState } from "react-portal";
import { Link, useLocation } from "react-router-dom";
import _ from "lodash";

const BreadcrumbsContent = ({ breadcrumbs = {} }) => {
  const { pathname } = useLocation();
  const spilttedPath = pathname.split("/");

  return (
    <div className="bg-white p-4 flex items-center flex-wrap">
      <ul className="flex items-center">
        <li className="inline-flex items-center">
          <a href="#" className="text-gray-600 hover:text-blue-500">
            <HomeIcon className="w-5 h-5" />
          </a>

          <ChevronRightIcon className="w-4 h-auto mx-4 text-gray-400" />
        </li>

        {spilttedPath.map((p, index) => {
          if (!p || p === "admin") return null;

          const isLastItem = index === spilttedPath?.length - 1;

          console.log({ p, pathname: breadcrumbs?.[p] });

          return (
            <li className="inline-flex items-center" key={p}>
              <Link
                to={breadcrumbs?.[p]}
                className={`${
                  isLastItem ? "text-blue-500" : "text-gray-600"
                } hover:text-blue-500`}
              >
                {_.capitalize(p)}
              </Link>

              {!isLastItem && (
                <ChevronRightIcon className="w-4 h-auto mx-4 text-gray-400" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Breadcrumbs = ({ breadcrumbs }) => {
  return (
    <PortalWithState node={document && document.getElementById("breadcrumbs")}>
      {() => <BreadcrumbsContent breadcrumbs={breadcrumbs} />}
    </PortalWithState>
  );
};

export default Breadcrumbs;
