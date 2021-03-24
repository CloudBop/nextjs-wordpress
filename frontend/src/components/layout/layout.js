import React from "react";
import Header from "./header";

function Layout({ data, children }) {
  return (
    <div>
      <Header headerMenus={data?.menus?.headerMenus} />
      {children}
    </div>
  );
}

export default Layout;
