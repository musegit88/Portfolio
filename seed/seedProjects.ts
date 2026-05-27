import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const connectionString =
  "postgresql://postgres:password@host:5432/portfolio?schema=public";

const adapter = new PrismaPg({
  connectionString,
});
const prisma = new PrismaClient({ adapter });

const seedProjects = async () => {
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        title: "[Title]",
        description: "[Description]",
        imageUrl: "[image-url]",
        demoUrl: "[demo-url]",
        technologies: ["NextJs", "mongodb", "prisma", "recaptcha"],
        featured: true,
        order: 1,
      },
    }),
  ]);
};

seedProjects();
