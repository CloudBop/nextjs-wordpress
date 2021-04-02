import { isEmpty } from "lodash";

export const isCustomPageUri = uri => {
  // explicitly created, exclude from getPath build process
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
  field,
  isPreview = false,
  loginRedirectURL = ""
) => {
  if (isPreview && null === data?.[field]) {
    return {
      redirect: {
        destination: loginRedirectURL || "/",
        statusCode: 307
      }
    };
  }

  if (isEmpty(data)) {
    return {
      redirect: {
        destination: "/503",
        statusCode: 301
      }
    };
  }

  if (field && isEmpty(data?.[field])) {
    return {
      // returns the default 404 page with a status code of 404
      notFound: true
    };
  }

  return defaultProps;
};

export const getLoginPreviewRedirectUrl = (
  postType = "",
  previewPostId = ""
) => {
  //
  return `/login/?postType=${postType || ""} &previewPostId=${
    previewPostId || ""
  }`;
};
