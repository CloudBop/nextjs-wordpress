import { isEmpty } from "lodash";

export const isCustomPageUri = uri => {
  const pagesToExclude = ["/", "/blog/", "/news/"];

  return pagesToExclude.includes(uri);
};
// properly 404
// https://nextjs.org/blog/next-10#blocking-fallback-for-getstaticpaths
export const FALLBACK = "blocking";
// pages to pre-render SSR
export const PRE_RENDER_PAGES_COUNT = 10;
//
// if data doesn't exist in wpgraphql
//
export const handleRedirectsAndReturnData = (
  defaultProps,
  data,
  errors,
  field
) => {
  if (isEmpty(data)) {
    return {
      redirect: {
        //  https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503 - service unavailable
        destination: "/503",
        statusCode: 301
      }
    };
  }

  // if field doesnt exist on data
  if (field && isEmpty(data?.[field])) {
    return {
      // returns the default 404 page with a status code of 404
      notFound: true
    };
  }

  return defaultProps;
};
