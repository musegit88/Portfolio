import bcrypt from "bcryptjs";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const connectionString =
  "postgresql://postgres:password@host:5432/portfolio?schema=public";

const adapter = new PrismaPg({
  connectionString,
});
const prisma = new PrismaClient({ adapter });
const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash("[PASSWORD]", 10);
  const admin = await prisma.admin.upsert({
    where: { email: "[EMAIL_ADDRESS]" },
    update: {},
    create: {
      email: "[EMAIL_ADDRESS]",
      password: hashedPassword,
      name: "Admin",
    },
  });
  console.log(admin);
};

createAdmin();
