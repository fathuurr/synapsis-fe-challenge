"use client";

import { PaginationComponent } from "@/components/pagination";
import { ContentArea } from "@/components/posts/content-area";
import { Heading } from "@/components/ui/heading";

import { toast } from "@/components/ui/use-toast";
import { paginationPosts } from "@/services/posts";
import { IPosts } from "@/types/posts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PagePost() {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20;

  const fetchDataPosts = async (page: number, perPage: number) => {
    setLoading(true);

    try {
      const res = await paginationPosts(page.toString(), perPage.toString());

      setPosts(res);
      setTotalPages(res.length === 0 ? 1 : Math.ceil(res.length / perPage));
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

  useEffect(() => {
    fetchDataPosts(currentPage, itemsPerPage);
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

        <ContentArea posts={posts} loading={loading} push={push} />

        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
