import React from "react";
import Footer from "./footer";
import Header from "./header";

function Layout({ data, children }) {
  return (
    <div>
      <Header header={data?.header} headerMenus={data?.menus?.headerMenus} />
      {children}
      <Footer footer={data?.footer} footerMenus={data?.menus?.footerMenus} />
    </div>
  );
}

export default Layout;
