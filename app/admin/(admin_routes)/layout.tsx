import React from "react";
import Header from "./_components/header";
import { getServerSession } from "next-auth";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();
  if (!session) return;

  return (
    <div>
      <Header session={session} />
      <main className="container">{children}</main>
    </div>
  );
};

export default Layout;
