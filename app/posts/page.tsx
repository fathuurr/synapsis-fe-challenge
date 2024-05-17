"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { paginationPosts } from "@/services/posts";
import { IPosts } from "@/types/posts";
import { Loader2, ScrollText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PagePost() {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchDataPosts = async () => {
      setLoading(true);

      try {
        const res = await paginationPosts(
          currentPage.toString(),
          itemsPerPage.toString(),
        );

        setPosts(res);
        setTotalPages(res.length);
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
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-start justify-between">
          <Heading title={`Post`} description="Show all posts here" />
        </div>

        <ScrollArea className="container mx-auto h-[calc(85vh-220px)]">
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
        </ScrollArea>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`${
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink> {currentPage}</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={`${
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
