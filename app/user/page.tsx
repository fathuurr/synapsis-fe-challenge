"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { getAllUsers } from "@/services/user";
import { IUser } from "@/types/user";
import { Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function UserPage() {
  const [user, setUser] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataUser = async () => {
      setLoading(true);
      try {
        const res = await getAllUsers();
        setUser(res);
      } catch (error: any) {
        toast({
          title: error,
          description: "Could not fetch all users from API",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDataUser();
  }, []);

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <div className="flex items-start justify-between">
          <Heading title={`User`} description="Manage user here" />
        </div>

        <Button>
          <Plus /> Add User
        </Button>

        <ScrollArea className="h-full">
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            {loading ? (
              <div className="flex items-center justify-center mt-10">
                <Loader2 className="animate-spin" size={50} />
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {user?.map((item) => {
                  return (
                    <Card key={item.id}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          {item.gender}
                        </CardTitle>

                        {item.status === "active" ? (
                          <Badge> 🟢 Active </Badge>
                        ) : (
                          <Badge> 🔴 Inactive </Badge>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold"> {item.name} </div>
                        <p className="text-xs text-muted-foreground">
                          {item.email}
                        </p>
                      </CardContent>

                      <CardFooter className="flex justify-between">
                        <Button className="bg-orange-400">Update</Button>
                        <Button variant="destructive">Delete</Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
