import Navbar from "@/components/layout/navbar";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar variant="landing" />
      {children}
    </>
  );
};

export default Layout;
