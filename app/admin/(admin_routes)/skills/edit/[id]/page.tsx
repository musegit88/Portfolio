import { prisma } from "@/lib/prisma";
import SkillForm from "../../../_components/skill-form";

const EditSkillPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const skill = await prisma.skill.findUnique({
    where: {
      id,
    },
  });

  return (
    <div className="w-full max-w-4xl mx-auto">
      <SkillForm skill={skill || undefined} />
    </div>
  );
};

export default EditSkillPage;
