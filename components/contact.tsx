import { Suspense } from "react";
import { BiLogoGmail } from "react-icons/bi";
import { MdOutlineContactMail } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa6";

import { prisma } from "@/lib/prisma";

import { Skeleton } from "./ui/skeleton";

const Contact = async () => {
  return (
    <Suspense fallback={<ContactSkeleton />}>
      <ContactContent />
    </Suspense>
  );
};

const ContactContent = async () => {
  const contact = await prisma.about.findFirst({
    select: {
      email: true,
      linkedin: true,
    },
  });
  return (
    <section className="mt-28">
      <div className="flex items-center gap-4">
        <h5 className="text-xl font-medium">Contact</h5>
        <MdOutlineContactMail size={20} />
      </div>
      <p className="text-xs md:text-sm text-gray-500 dark:text-white">
        Let&apos;s build something amazing together. Get in touch.
      </p>
      <div className="flex gap-4 mt-6">
        <div className="border p-2 rounded-md transition duration-200 shadow-md">
          <a href={`mailto:${contact?.email}`} target="_blank">
            <BiLogoGmail size={40} className="" />
          </a>
        </div>
        <div className="border p-2 rounded-md transition duration-200 shadow-md">
          <a href={`${contact?.linkedin}`} target="_blank">
            <FaLinkedinIn size={40} className="" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;

// skeleton for contact while loading
const ContactSkeleton = () => {
  return (
    <section className="mt-28">
      <div className="flex flex-col gap-2">
        <Skeleton className="w-40 h-6 bg-gray-500/40" />
        <Skeleton className="w-32 h-4 bg-gray-500/40" />
      </div>
      <div className="flex flex-wrap w-full gap-4 mt-6">
        {Array.from({ length: 2 }).map((_, index) => (
          <Skeleton key={index} className="w-20 h-20 bg-gray-500/40" />
        ))}
      </div>
    </section>
  );
};
