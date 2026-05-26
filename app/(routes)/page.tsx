import { getServerSession } from "next-auth";

import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Projects from "@/components/projects";
import Skills from "@/components/skills";

export default async function Home() {
  const session = await getServerSession();
  const user = session?.user;
  return (
    <>
      <Navbar user={user || undefined} />
      <Hero />
      <Skills user={user || undefined} />
      <Projects user={user || undefined} />
      <Contact user={user || undefined} />
      <Footer />
    </>
  );
}
