import React from "react";
import PropTypes from "prop-types";
import { Wrapper } from "./Wrapper";
import { NavBar } from "./Navbar";
import { WrapperVariant } from "./Wrapper";

interface LayoutProps {
  variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
