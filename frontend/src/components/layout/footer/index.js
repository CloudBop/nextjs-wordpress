import { isEmpty } from "lodash";

function Footer({ footer, footerMenus }) {
  if (isEmpty(footerMenus)) return null;

  return <footer>Footer</footer>;
}

export default Footer;
