import type { ReactNode } from "react";

import { Header } from "./Header";

type LayoutProps = {
  readonly children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className="bg-main ">{children}</main>
    </>
  );
};
