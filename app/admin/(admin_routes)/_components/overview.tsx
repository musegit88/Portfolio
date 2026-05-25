import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClipboardList, FileText, Plus, Star } from "lucide-react";
import Link from "next/link";

const Overview = ({
  projectsCount,
  featuredProjectsCount,
  skillsCount,
}: {
  projectsCount: number;
  featuredProjectsCount: number;
  skillsCount: number;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="text-blue-600 w-8 h-8" />
            <p>Total Projects</p>
          </CardTitle>
          <CardDescription>
            All projects you have added to your portfolio.
          </CardDescription>
          <CardAction>
            <Button variant="link" size="icon" asChild>
              <Link href="/admin/projects/add">
                <Plus />
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="h-full flex items-center gap-4">
          <h1 className="text-6xl font-bold">{projectsCount}</h1>
          <p className="text-2xl font-semibold text-muted-foreground">
            Projects
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="text-purple-600 w-8 h-8" />
            <p>Featured Projects</p>
          </CardTitle>
          <CardDescription>
            All featured projects you have added to your portfolio.
          </CardDescription>
          <CardAction>
            <Button variant="link" size="icon" asChild>
              <Link href="/admin/projects/add">
                <Plus />
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="h-full flex items-center gap-4">
          <h1 className="text-6xl font-bold">{featuredProjectsCount}</h1>
          <p className="text-2xl font-semibold text-muted-foreground">
            Projects
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="text-green-500 w-8 h-8" />
            <p>Total Skills</p>
          </CardTitle>
          <CardDescription>
            All skills you have added to your portfolio.
          </CardDescription>
          <CardAction>
            <Button variant="link" size="icon" asChild>
              <Link href="/admin/skills/add">
                <Plus />
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="h-full flex items-center gap-4">
          <h1 className="text-6xl font-bold">{skillsCount}</h1>
          <p className="text-2xl font-semibold text-muted-foreground">Skills</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
