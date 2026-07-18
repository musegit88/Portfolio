import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";

import Header from "./_components/header";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const avatar = await prisma.about.findFirst({
    select: {
      avatarUrl: true,
    },
  });

  return (
    <div>
      <Header avatar={avatar?.avatarUrl || undefined} />
      <main className="container my-4">{children}</main>
    </div>
  );
};

export default Layout;
