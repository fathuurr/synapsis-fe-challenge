import { ScrollText } from "lucide-react";

import { IPosts } from "@/types/posts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";

export const PostAccordion = ({
  post,
  push,
}: {
  post: IPosts;
  push: (path: string) => void;
}) => (
  <Accordion type="single" collapsible>
    <AccordionItem value={`item-${post.id}`}>
      <AccordionTrigger>{post.title}</AccordionTrigger>
      <AccordionContent>
        {post.body}
        <p className="mt-10 text-emerald-600">Posted by User: {post.user_id}</p>
        <div className="mt-5">
          <Button
            size="sm"
            variant="outline"
            onClick={() => push(`/posts/${post.id}`)}
          >
            Post Detail
            <ScrollText className="ml-2 text-emerald-500" />
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
