function Error404({ data }) {
  const { header, footer, headerMenus, footerMenus } = data || {};
  return <>404</>;
}

export default Error404;

// export async function getStaticProps() {
//   const { data } = await client.query({
//     query: GET_MENUS
//   });

//   return {
//     props: {
//       data: data || {}
//     }
//   };
// }
