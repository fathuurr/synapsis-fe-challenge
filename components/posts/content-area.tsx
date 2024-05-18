import { IPosts } from "@/types/posts";
import { Loader2 } from "lucide-react";
import { PostAccordion } from "./post-accordion";
import { ScrollArea } from "../ui/scroll-area";

export const ContentArea = ({
  posts,
  loading,
  push,
}: {
  posts: IPosts[];
  loading: boolean;
  push: (path: string) => void;
}) => (
  <ScrollArea className="container mx-auto h-[calc(85vh-220px)]">
    {loading ? (
      <div className="flex items-center justify-center mt-10">
        <Loader2 className="animate-spin" size={50} />
      </div>
    ) : posts.length > 0 ? (
      posts.map((post) => (
        <PostAccordion key={post.id} post={post} push={push} />
      ))
    ) : (
      <div className="flex items-center justify-center mt-10">
        <p>No Data</p>
      </div>
    )}
  </ScrollArea>
);
