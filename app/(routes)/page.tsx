import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const settings = await prisma.setting.findFirst({
    where: {
      userId: user?.id,
    },
  });
  return (
    <>
      <Navbar user={user || undefined} settings={settings || undefined} />
      <Hero />
      <Skills user={user || undefined} />
      <Projects user={user || undefined} />
      <Contact user={user || undefined} />
      <Footer />
    </>
  );
}
