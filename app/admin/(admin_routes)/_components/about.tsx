"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { About } from "@/generated/prisma/client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { User } from "lucide-react";

const AboutTab = ({ about }: { about: About | null }) => {
  const [name, setName] = useState(about?.name);
  const [title, setTitle] = useState(about?.title);
  const [bio, setBio] = useState(about?.bio);
  const [avatarUrl, setAvatarUrl] = useState(about?.avatarUrl);
  const [github, setGithub] = useState(about?.github);
  const [linkedin, setLinkedin] = useState(about?.linkedin);
  const [email, setEmail] = useState(about?.email);
  const [enableEdit, setEnableEdit] = useState(false);
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardAction>
          <Button onClick={() => setEnableEdit(!enableEdit)}>
            {enableEdit ? "Save" : "Edit"}
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center sm:flex-row gap-10">
          <div className="w-fit">
            <div className="w-72 h-72 rounded-full overflow-hidden border border-green-500">
              {avatarUrl ? (
                <Image src={avatarUrl} alt={name!} />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-400/20">
                  <User size={32} />
                </div>
              )}
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => enableEdit && setName(e.target.value)}
                  className={cn(
                    "font-bold sm:w-fit",
                    !enableEdit && "border-none cursor-not-allowed",
                  )}
                  style={{ fontSize: "36px", padding: "24px 12px" }}
                />
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => enableEdit && setTitle(e.target.value)}
                  className={cn(
                    "w-fit",
                    !enableEdit && "border-none cursor-not-allowed",
                  )}
                  style={{ fontSize: "14px" }}
                />
              </div>
              <div className="h-[200px] overflow-y-auto">
                <Textarea
                  value={bio}
                  onChange={(e) => enableEdit && setBio(e.target.value)}
                  rows={8}
                  className={cn(
                    "resize-none",
                    !enableEdit && "border-none cursor-not-allowed",
                  )}
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <MdEmail size={24} />
                <Input
                  type="text"
                  value={email!}
                  onChange={(e) => enableEdit && setEmail(e.target.value)}
                  className={cn(
                    "w-fit",
                    !enableEdit && "border-none cursor-not-allowed",
                  )}
                />
              </div>
              <div className="flex items-center gap-2">
                <FaGithub size={24} />
                <Input
                  type="text"
                  value={github!}
                  onChange={(e) => enableEdit && setGithub(e.target.value)}
                  className={cn(
                    "w-fit",
                    !enableEdit && "border-none cursor-not-allowed",
                  )}
                />
              </div>
              <div className="flex items-center gap-2">
                <FaLinkedin size={24} />
                <Input
                  type="text"
                  value={linkedin!}
                  onChange={(e) => enableEdit && setLinkedin(e.target.value)}
                  className={cn(
                    "w-fit",
                    !enableEdit && "border-none cursor-not-allowed",
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutTab;
