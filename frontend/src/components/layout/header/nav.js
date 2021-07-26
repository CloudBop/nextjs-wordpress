import { isEmpty } from "lodash";
import Link from "next/link";
import { useState } from "react";
import { isCustomPageUri } from '../../../utils/slugs'

const Nav = ({ header, headerMenus }) => {
  //
  if (isEmpty(headerMenus)) {
    return null;
  }

  const [isMenuVisible, setMenuVisibility] = useState(false);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-green-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link href="/">
          <a>
            <img
              src={header?.siteLogoUrl ?? "/images/site-logo.png"}
              alt="Site Logo"
              width="48"
              height="48"
              className="mr-4"
            />
          </a>
        </Link>
        <div className="flex flex-col items-start justify-start">
          <span className="font-semibold text-xl tracking-tight">
            {header?.siteTitle}
          </span>
          <span>{header?.siteTagLine}</span>
        </div>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => setMenuVisibility(!isMenuVisible)}
          className="flex items-center px-3 py-2 border rounded text-green-200 border-green-400 hover:text-white hover:border-white"
          data-cy="mobile-menu-btn"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`${isMenuVisible ? "max-h-full" : "h-0"
          } overflow-hidden w-full lg:h-full lg:h-auto block flex-grow lg:flex lg:items-center lg:w-auto`}
      >
        {headerMenus?.length ? (
          <div className="text-sm lg:flex-grow">
            {headerMenus?.map(menu => {

              // exclude if is explicitily set in wordpress...
              if (!isCustomPageUri(menu?.node?.path)) {
                return (
                  <Link key={menu?.node?.id} href={menu?.node?.path}>
                    <a
                      className="block mt-4 lg:inline-block lg:mt-0 text-green-200 hover:text-white mr-4"
                      data-cy="nav-item"
                    >
                      {menu?.node?.label}
                    </a>
                  </Link>
                )
              }
            })}

            <Link href={"/blog/"}>
              {/* explicitly hardcode, this is NOT customisable with the WP-ADMIN
              TODO- hardcode /blog/ as project constant */}
              <a
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                data-cy="nav-item"
              >
                Blog
              </a>
            </Link>
            <Link href={"/news/"}>
              {/* explicitly hardcode, this is NOT customisable with the WP-ADMIN
              TODO- hardcode /blog/ as project constant */}
              <a
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                data-cy="nav-item"
              >
                News
              </a>
            </Link>
          </div>
        ) : null}

      </div>
    </nav>
  );
};

export default Nav;
