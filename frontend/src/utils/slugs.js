export const isCustomPageUri = uri => {
  const pagesToExclude = ["/", "/blog/", "/news/"];

  return pagesToExclude.includes(uri);
};
