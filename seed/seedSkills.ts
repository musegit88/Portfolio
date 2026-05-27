import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const connectionString =
  "postgresql://postgres:password@host:5432/portfolio?schema=public";

const adapter = new PrismaPg({
  connectionString,
});
const prisma = new PrismaClient({ adapter });
const seedSkill = async () => {
  const skills = await Promise.all([
    prisma.skill.create({
      data: {
        name: "HTML5",
        category: "Frontend",
        icon: "FaHtml5",
        level: 10,
        order: 1,
      },
    }),
  ]);
};

seedSkill();
