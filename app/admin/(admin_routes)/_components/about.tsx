"use client";

import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

import { About } from "@/generated/prisma/client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

const AboutTab = ({ about }: { about: About | null }) => {
  return (
    <Card className="mb-4 max-w-2xl mx-auto">
      <CardHeader>
        <CardAction>
          <Button asChild>
            <Link href="/admin/about/edit">Edit</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col justify-center sm:flex-row mx-auto gap-4">
            <div className="w-fit">
              <div className="w-44 h-44 rounded-full overflow-hidden border border-green-500">
                {about?.avatarUrl ? (
                  <Image
                    src={about?.avatarUrl}
                    alt={about?.name || "avatar"}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-400/20">
                    <User size={32} />
                  </div>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col justify-center">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <h1 className="text-4xl font-bold">{about?.name}</h1>
                  <h4 className="text-sm font-medium">{about?.title}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-lg h-[200px] mx-auto overflow-y-auto">
            <p className="text-sm">{about?.bio}</p>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-2">
            {about?.email && (
              <div className="flex items-center gap-2">
                <MdEmail size={24} />
                <span>{about?.email}</span>
              </div>
            )}
            {about?.github && (
              <div className="flex items-center gap-2">
                <FaGithub size={24} />
                <span>{about?.github}</span>
              </div>
            )}
            {about?.linkedin && (
              <div className="flex items-center gap-2">
                <FaLinkedin size={24} />
                <span>{about?.linkedin}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutTab;
