import Nav from "./nav";

function Header({ headerMenus, header }) {
  return (
    <header>
      <Nav header={header} headerMenus={headerMenus} />
    </header>
  );
}

export default Header;
