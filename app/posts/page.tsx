"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { toast } from "@/components/ui/use-toast";
import { getAllPosts } from "@/services/posts";
import { IPosts } from "@/types/posts";
import { Loader2, ScrollText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PagePost() {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();

  useEffect(() => {
    const fetchDataPosts = async () => {
      setLoading(true);

      try {
        const res = await getAllPosts();

        setPosts(res);
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

    fetchDataPosts();
  }, []);

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-start justify-between">
          <Heading title={`Post`} description="Show all posts here" />
        </div>

        <section className="container mx-auto">
          {loading ? (
            <div className="flex items-center justify-center mt-10">
              <Loader2 className="animate-spin" size={50} />
            </div>
          ) : (
            posts?.map((item) => {
              return (
                <>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger> {item.title} </AccordionTrigger>
                      <AccordionContent>
                        {item.body}

                        <p className="mt-10 text-emerald-600">
                          Posted by User: {item.user_id}
                        </p>

                        <div className="mt-5">
                          <Button
                            size={"sm"}
                            variant={"outline"}
                            onClick={() => push(`/posts/${item.id}`)}
                          >
                            Post Detail
                            <ScrollText className="ml-2 text-emerald-500" />
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </>
              );
            })
          )}
        </section>
      </div>
    </>
  );
}
