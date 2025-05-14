import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';



function Header() {
  return (
    <Navbar color="light" light expand="md" className="mb-4 shadow-sm px-3">
      <NavbarBrand href="/" className="d-flex align-items-center gap-2">
        <img src="/images.jpg" alt="Fit & Sabor Logo" height="40" />
        <span className="fw-bold fs-4 text-success">Fit & Sabor</span>
      </NavbarBrand>
    </Navbar>
  );
}

export default Header;
