import { prisma } from "@/lib/prisma";
import AboutForm from "../../_components/about-form";

const EditAbout = async () => {
  const about = await prisma.about.findFirst();
  return (
    <div className="w-full max-w-4xl mx-auto">
      <AboutForm about={about!} />
    </div>
  );
};

export default EditAbout;
