import { prisma } from "@/lib/prisma";
import SkillForm from "../../../_components/skill-form";

type Params = Promise<{ id: string }>;

const EditSkillPage = async ({ params }: { params: Params }) => {
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
