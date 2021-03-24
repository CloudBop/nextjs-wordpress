import Nav from "./nav";

function Header({ headerMenus }) {
  return (
    <header>
      <Nav headerMenus={headerMenus} />
    </header>
  );
}

export default Header;
