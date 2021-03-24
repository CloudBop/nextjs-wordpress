import gql from "graphql-tag";
import MenuFragment from "./fragments/menus";
//
export const HeaderFooter = `
header: getHeader {
      favicon
      siteLogoUrl
      siteTagLine
      siteTitle
    }
    headerMenus: menuItems(
      where: { location: HCMS_MENU_HEADER, parentId: "0" }
    ) {
      edges {
        node {
          ...MenuFragment
          childItems {
            edges {
              node {
                ...MenuFragment
              }
            }
          }
        }
      }
    }
    footerMenus: menuItems(
      where: { location: HCMS_MENU_FOOTER, parentId: "0" }
    ) {
      edges {
        node {
          ...MenuFragment
        }
      }
    }
    footer: getFooter {
      copyrightText
      sidebarTwo
      sidebarOne
      socialLinks {
        iconName
        iconUrl
      }
    }
`;

export const GET_MENUS = gql`
  query GetHeaderAndFooterMenus {
    __typename
    ${HeaderFooter}
  }
  ${MenuFragment}
`;
