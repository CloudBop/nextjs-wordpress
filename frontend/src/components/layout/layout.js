import React from "react";
import Footer from "./footer";
import Header from "./header";
import Head from "next/head";
import Seo from "../seo";
import { isEmpty } from "lodash";
import { sanitize } from "../../utils/misc";

function Layout({ data, children }) {
  const { page, header, footer, headerMenus, footerMenus } = data || {};

  // If it does not have either post or page.
  if (
    isEmpty(page)
    // && isEmpty(post) && isEmpty(posts)
  ) {
    return null;
  }

  return (
    <div>
      <Seo seo={page?.seo} uri={page.uri} />
      <Head>
        <link rel="shortcut icon" href={header?.favicon || ""} />
        {page?.seo?.schemaDetails ? (
          <script
            type="application/ld+json"
            className="yoast-schema-graph"
            key="yoastSchema"
            dangerouslySetInnerHTML={{
              __html: sanitize(page?.seo?.schemaDetails)
            }}
          />
        ) : null}
      </Head>
      <Header header={header} headerMenus={headerMenus.edges} />
      <div className={"h-almost-screen"}>{children}</div>
      <Footer footer={footer} footerMenus={footerMenus.edges} />
    </div>
  );
}

export default Layout;
