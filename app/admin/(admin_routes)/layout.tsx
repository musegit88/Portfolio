import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";

import Header from "./_components/header";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();
  if (!session) return;

  const avatar = await prisma.about.findFirst({
    select: {
      avatarUrl: true,
    },
  });

  return (
    <div>
      <Header session={session} avatar={avatar?.avatarUrl || undefined} />
      <main className="container my-4">{children}</main>
    </div>
  );
};

export default Layout;
