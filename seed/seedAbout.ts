import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const connectionString =
  "postgresql://postgres:password@host:5432/portfolio?schema=public";

const adapter = new PrismaPg({
  connectionString,
});
const prisma = new PrismaClient({ adapter });
const seedAbout = async () => {
  const about = await prisma.about.create({
    data: {
      name: "[NAME]",
      title: "Frontend Web Developer",
      bio: "[Write your about section here]",
      email: "[EMAIL_ADDRESS]",
      github: "https://github.com/",
      linkedin: "https://www.linkedin.com/in/",
    },
  });
  console.log(about);
};

seedAbout();
