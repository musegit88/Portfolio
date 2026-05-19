"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Dashboard = () => {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    redirect("/admin/login");
  }
  if (!session) return;
  return <div>Admin dashboard</div>;
};

export default Dashboard;
