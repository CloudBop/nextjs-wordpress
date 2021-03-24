import React from "react";
import Footer from "./footer";
import Header from "./header";
import Head from "next/head";
function Layout({ data, children }) {
  return (
    <div>
      <Head>
        <link rel="shortcut icon" href={data?.header?.favicon || ""} />
      </Head>
      <Header header={data?.header} headerMenus={data?.menus?.headerMenus} />
      <div className={"h-almost-screen"}>{children}</div>
      <Footer footer={data?.footer} footerMenus={data?.menus?.footerMenus} />
    </div>
  );
}

export default Layout;
