import Form from "@/app/admin/(admin_routes)/_components/form";
import { prisma } from "@/lib/prisma";

const EditProjectPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });
  return (
    <div className="my-4 w-full max-w-4xl mx-auto">
      <Form project={project || undefined} />
    </div>
  );
};

export default EditProjectPage;
