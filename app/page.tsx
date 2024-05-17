"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ScrollText, Users } from "lucide-react";

export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">User</CardTitle>
              <Users />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+50</div>
              <p className="text-xs text-muted-foreground">Total Users</p>
              <Button
                className="mt-5"
                variant={"outline"}
                onClick={() => {
                  window.location.href = "/user";
                }}
              >
                View Details <ArrowRight />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Post</CardTitle>
              <ScrollText />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+50</div>
              <p className="text-xs text-muted-foreground">Total Post</p>

              <Button
                className="mt-5"
                variant={"outline"}
                onClick={() => {
                  window.location.href = "/posts";
                }}
              >
                View Details <ArrowRight />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
