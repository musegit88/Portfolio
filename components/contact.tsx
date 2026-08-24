import { Suspense } from "react";
import Link from "next/link";
import { Session } from "next-auth";

import { prisma } from "@/lib/prisma";

import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { ContactForm } from "./contact-form";
import { FaLinkedinIn } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";

const Contact = async ({ user }: { user?: Session["user"] }) => {
  return (
    <Suspense fallback={<ContactSkeleton />}>
      <ContactContent user={user || undefined} />
    </Suspense>
  );
};

const ContactContent = async ({ user }: { user?: Session["user"] }) => {
  const contact = await prisma.about.findFirst({
    select: {
      email: true,
      linkedin: true,
    },
  });
  return (
    <section id="contact" className="relative py-16 sm:py-24 snap-start snap-always scroll-mt-20 pt-20 flex flex-col items-center justify-start overflow-hidden">
      {/* Vibrant Background for Glassmorphism */}
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-200 h-100 bg-linear-to-tr from-violet-500/30 via-fuchsia-500/30 to-orange-500/30 blur-[100px] rounded-full" />
      </div>
      {/* Top & bottom fade to blend with adjacent sections */}
      <div className="absolute top-0 inset-x-0 h-32 -z-10 bg-linear-to-b from-background to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 -z-10 bg-linear-to-t from-background to-transparent pointer-events-none" />

      <div className="container flex flex-col items-center justify-center">

        <div className="flex items-center gap-4 relative z-10">
          <h5 className="text-xl sm:text-2xl font-medium">Contact</h5>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground relative z-10 mb-8">
          Let&apos;s build something amazing together. Get in touch.
        </p>
        {contact?.email && contact?.linkedin ? (
          <div className="flex flex-col gap-8 w-full max-w-2xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-6 sm:p-10 rounded-3xl shadow-2xl relative z-10">
            <div className="w-full">
              <ContactForm email={contact.email} />
            </div>
            <div className="flex flex-col gap-4 items-center mt-4">
              <p className="text-sm">Social Links</p>
              <div className="flex gap-4">
                <a href={`${contact.linkedin}`} target="_blank" className="bg-background border border-white/30 dark:border-white/10 p-3 rounded-md transition duration-300 shadow-sm hover:scale-110">
                  <FaLinkedinIn size={22} />
                </a>

              </div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-center w-full">
            {user ? (
              <div className="flex items-center justify-center gap-2">
                <p>Manage Contact from </p>
                <Button asChild>
                  <Link href="/admin/dashboard">Dashboard</Link>
                </Button>
              </div>
            ) : (
              <p>🤭 Oops! Nothing to show.</p>
            )}
          </div>
        )}
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
